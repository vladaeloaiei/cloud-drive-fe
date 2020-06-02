import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service'
import { UserBucketService } from '../_services/user-bucket.service'
import { AuthenticationService } from '../_services/authentication.service';
import { UserBucket } from '../_models/user-bucket';
import { AddFileModalComponent } from '../add-file-modal/add-file-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareBucketModalComponent } from '../share-bucket-modal/share-bucket-modal.component';
import { CreateBucketModalComponent } from '../create-bucket-modal/create-bucket-modal.component';
import { DeleteBucketModalComponent } from '../delete-bucket-modal/delete-bucket-modal.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    public currentUser: User;
    id: any;

    public ownedBuckets: UserBucket[] = [];
    public sharedBuckets: UserBucket[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private userBucketService: UserBucketService,
        public matDialog: MatDialog,
        private modalService: NgbModal
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.refresh();

        // this.id = setInterval(() => {
        //     this.refresh();
        // }, 5000);
    }

    ngOnDestroy() {
        if (this.id) {
            clearInterval(this.id);
        }
    }

    private loadOwnedBuckets() {
        this.userBucketService.getOwned(this.currentUser.username)
            .pipe(first())
            .subscribe(ownedBuckets => this.ownedBuckets = ownedBuckets);
    }

    private loadSharedBuckets() {
        this.userBucketService.getShared(this.currentUser.username)
            .pipe(first())
            .subscribe(sharedBuckets => this.sharedBuckets = sharedBuckets);
    }

    createBucketModal() {
        const modalRef = this.modalService.open(CreateBucketModalComponent);
        modalRef.componentInstance.homeComponent = this
    }

    openAddFileModal() {
        var buckets = []
        buckets = this.ownedBuckets.concat(this.sharedBuckets)

        const modalRef = this.modalService.open(AddFileModalComponent);
        modalRef.componentInstance.buckets = buckets
        modalRef.componentInstance.homeComponent = this
    }

    openShareBucketModal() {
        var buckets = []
        buckets = this.ownedBuckets

        const modalRef = this.modalService.open(ShareBucketModalComponent);
        modalRef.componentInstance.buckets = buckets
        modalRef.componentInstance.homeComponent = this
    }

    openDeleteBucketModal() {
        var buckets = []
        buckets = this.ownedBuckets

        const modalRef = this.modalService.open(DeleteBucketModalComponent);
        modalRef.componentInstance.buckets = buckets
        modalRef.componentInstance.homeComponent = this
    }

    deleteFile(bucketId: number, filename: string) {
        this.userBucketService.deleteFile(bucketId, filename)
            .subscribe(() => this.refresh());
    }

    downloadFile(bucketId: number, filename: string) {
        this.userBucketService.downloadFile(bucketId, filename)
            .subscribe(response => {
                //let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
                //const url= window.URL.createObjectURL(blob);
                //window.open(url);
                window.location.href = response.url;
                //fileSaver.saveAs(blob, 'employees.json');
            }), error => console.log('Error downloading the file'),
            () => console.info('File downloaded successfully');
    }

    public refresh() {
        this.loadOwnedBuckets();
        this.loadSharedBuckets();
    }
}