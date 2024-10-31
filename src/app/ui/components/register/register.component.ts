import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/user.service';

import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { Create_User } from '../../../contracts/user/create_user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: CustomToastrService) { }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(3)]
      ],
      userName: ["", [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3)]],
      email: ["", [
        Validators.required,
        Validators.email]],
      password: ["", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)]],
      passwordConfirm: ["", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)]]
    })
  }
  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;

  async onSubmit(user: User) {

    this.submitted = true;

    if (this.frm.invalid)
      return;
    const result: Create_User = await this.userService.create(user)

    if (result.succeeded) {
      this.toastr.message(result.message, "BAŞARILI", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      }
      )
    }
    else {
      this.toastr.message(result.message, "HATA", {

        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
    }
  }
}
