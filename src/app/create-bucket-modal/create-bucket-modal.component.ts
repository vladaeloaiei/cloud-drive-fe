import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserBucketService } from '../_services/user-bucket.service';

@Component({
  selector: 'app-create-bucket-modal',
  templateUrl: './create-bucket-modal.component.html',
  styleUrls: ['./create-bucket-modal.component.css']
})
export class CreateBucketModalComponent implements OnInit {
  @Input() homeComponent: HomeComponent;

  form = new FormGroup({
    bucketName: new FormControl('', [Validators.required, Validators.minLength(4)])
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

  submit() {
    this.userBucketService.createBucket(this.homeComponent.currentUser.username, this.form.value.bucketName)
      .subscribe(
        (res) => res = res,
        (err) => err = err,
        () => this.homeComponent.refresh()
      );
  }
}
