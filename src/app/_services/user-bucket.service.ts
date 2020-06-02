import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map, first } from 'rxjs/operators';

import { UserBucket } from '../_models/user-bucket';
import { AppComponent } from '../app.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserBucketService {
    constructor(private http: HttpClient,
        private sanitizer: DomSanitizer) { }

    getOwned(ownerUsername: String) {
        return this.http.get<UserBucket[]>(AppComponent.backendUrl + `/user/bucket/owner/` + ownerUsername);
    }

    getShared(granteeUsername: String) {
        return this.http.get<UserBucket[]>(AppComponent.backendUrl + `/user/bucket/grantee/` + granteeUsername);
    }

    uploadFile(bucketId: Number, file: FormData) {
        let uploadURL = AppComponent.backendUrl + `/user/drive/` + bucketId;

        return this.http.post<any>(uploadURL, file, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            map((event) => {
                switch (event.type) {

                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * event.loaded / event.total);
                        return { status: 'progress', message: progress };

                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return `Unhandled event: ${event.type}`;
                }
            })
        );
    }

    deleteFile(bucketId: number, fileName: string) {
        return this.http.delete(AppComponent.backendUrl + `/user/drive/` + bucketId + "/" + fileName);
    }

    downloadFile(bucketId: number, fileName: string): Observable<any> {
        return this.http.get(AppComponent.backendUrl + `/user/drive/` + bucketId + "/" + fileName, {observe: 'response', responseType: 'blob'});
    }

    createBucket(username: string, bucketName: string) {
        return this.http.post<any>(AppComponent.backendUrl + `/user/bucket/owner/` + username + "/" + bucketName, null);
    }

    shareBucket(ownerUsername: string, bucketName: string, granteeUsername: string) {
        let postData = new FormData();
        postData.append('ownerUsername', ownerUsername);

        return this.http.post<any>(AppComponent.backendUrl + "/user/bucket/grantee/" + granteeUsername + "/" + bucketName, postData);
    }

    deleteBucket(ownerUsername: string, bucketName: string) {
        return this.http.delete(AppComponent.backendUrl + "/user/bucket/owner/" + ownerUsername + "/" + bucketName);
    }
}