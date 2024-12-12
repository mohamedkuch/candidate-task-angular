import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {UserEditComponent} from "../../views/user-edit/user-edit.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {
  @Input() user!: User;

  constructor(
    private dialog: MatDialog,
  ) {
  }

  onEditUserClick(editButton: HTMLButtonElement): void {
    // Blur button to prevent aria-hidden focus error when modal opens
    editButton.blur();

    const dialogRef = this.dialog.open(UserEditComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed with result:', result);
    });
  }
}
