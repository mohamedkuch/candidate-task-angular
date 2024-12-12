import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  userData: User;

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.userData = {...data};
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.dialogRef.close(this.userData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
