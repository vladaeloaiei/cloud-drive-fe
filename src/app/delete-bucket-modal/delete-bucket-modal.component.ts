import { Component, OnInit, Input } from '@angular/core';
import { UserBucket } from '../_models/user-bucket';
import { HomeComponent } from '../home/home.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserBucketService } from '../_services/user-bucket.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-bucket-modal',
  templateUrl: './delete-bucket-modal.component.html',
  styleUrls: ['./delete-bucket-modal.component.css']
})
export class DeleteBucketModalComponent implements OnInit {

  @Input() buckets: UserBucket[];
  @Input() homeComponent: HomeComponent;

  form = new FormGroup({
    bucket: new FormControl('' , Validators.required),
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

  delete() {
    this.userBucketService.deleteBucket(this.homeComponent.currentUser.username, this.form.value.bucket)
      .subscribe(
        (res) => res = res,
        (err) => err = err,
        () => this.homeComponent.refresh()
      );
  }

}
