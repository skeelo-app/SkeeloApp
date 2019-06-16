import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.page.html',
  styleUrls: ['./bug-report.page.scss'],
})
export class BugReportPage implements OnInit {

  public bugForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.bugForm = formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', Validators.compose(
        [
          Validators.required,
          Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,15})$')
        ]
      )],
      textarea: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  report() {
    console.log(this.bugForm.value);
    this.router.navigateByUrl('/');
  }

}
