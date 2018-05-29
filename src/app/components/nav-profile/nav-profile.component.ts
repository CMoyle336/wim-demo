import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService, User } from '@apttus/ecommerce';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrls: ['./nav-profile.component.scss']
})
export class NavProfileComponent implements OnInit {
  user: User;
  regUser: User;
  loading: boolean = false;
  state: 'LOGIN' | 'REGISTER' | 'REGISTER_CONFIRM' = 'LOGIN';
  username: string;
  password: string;

  modalRef: NgbModalRef;

  constructor(private userService: UserService,
              private ngZone: NgZone,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.userService.me().subscribe(res => this.ngZone.run(() => {
      this.user = res;
      this.regUser = Object.assign({}, this.user);
    }));
  }

  login() {
    this.loading = true;
    this.userService.login(this.username, this.password).subscribe(res => {
      this.modalRef.close();
      this.loading = false;
      this.router.navigate(['/']);
    }, err => {
      this.loading = false;
      console.error(err);
    });
  }

  logout() {
    this.userService.logout().subscribe(() => this.router.navigate(['/']));
  }

  onRegister() {
    this.loading = true;
    this.regUser.Username = this.regUser.Email;
    this.userService.register(this.regUser).subscribe(res => {
      this.loading = false;
    },
    err => {
      console.log(err);
      this.loading = false;
    });
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

}
