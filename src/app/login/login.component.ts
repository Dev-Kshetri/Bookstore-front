import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleFormClick(event: any, user: any, password: any) {
    event.preventDefault();

    const userToAuth = ({ username: user.value, password: password.value });
    let isLogged: boolean = false;

    fetch(`http://localhost:8081/users/log?username=${userToAuth.username}&password=${userToAuth.password}`)
      .then(data => data.json())
      .then(response => {
        console.log(response)
        isLogged = true;
        response.role === "ADMIN" && this.router.navigate(['./adminpage']);
        response.role === "USER" && this.router.navigate(['./userpage']);
      })
      .catch(err => {
        isLogged = false;
        alert("El usuario no existe o la contraseña es incorrecta");
      })
  }
}
