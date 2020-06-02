import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserBucketService } from '../_services/user-bucket.service';
import { UserBucket } from '../_models/user-bucket';

@Component({
  selector: 'app-share-bucket-modal',
  templateUrl: './share-bucket-modal.component.html',
  styleUrls: ['./share-bucket-modal.component.css']
})
export class ShareBucketModalComponent implements OnInit {

  @Input() buckets: UserBucket[];
  @Input() homeComponent: HomeComponent;

  form = new FormGroup({
    bucket: new FormControl('' , Validators.required),
    granteeUsername: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private userBucketService: UserBucketService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  get f() {
    return this.form.controls;
  }

  share() {
    this.userBucketService.shareBucket(this.homeComponent.currentUser.username, this.form.value.bucket, this.form.value.granteeUsername)
      .subscribe(
        (res) => res = res,
        (err) => err = err,
        () => this.homeComponent.refresh()
      );
  }
}

