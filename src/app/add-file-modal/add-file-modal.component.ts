import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { UserBucket } from '../_models/user-bucket';
import { first } from 'rxjs/operators';
import { UserBucketService } from '../_services/user-bucket.service';

@Component({
  selector: 'app-add-file-modal',
  templateUrl: './add-file-modal.component.html',
  styleUrls: ['./add-file-modal.component.css']
})
export class AddFileModalComponent implements OnInit {

  @Input() buckets: UserBucket[];
  @Input() homeComponent: HomeComponent;

  pickedBucketIndex: number = 0
  fileToUpload: File = null

  form = new FormGroup({
    bucket: new FormControl('', Validators.required)
  });

  constructor(private userBucketService: UserBucketService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.pickedBucketIndex = 0
  }

  get f() {
    return this.form.controls;
  }

  changeBucket(e) {
    this.pickedBucketIndex = e.target.value;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload() {
    const formData = new FormData();
    formData.append("file", this.fileToUpload);
    formData.append("filename", this.fileToUpload.name);

    this.userBucketService.uploadFile(this.buckets[this.pickedBucketIndex].id, formData)
      .subscribe(
        (res) => res = res,
        (err) => err = err,
        () => this.homeComponent.refresh()
      );
  }
}
