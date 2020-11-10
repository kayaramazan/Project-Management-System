import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {
  configs: any[] = []
  isResetNavbar = true; // Reload navbar
  constructor(private api: ApiService, private router: Router) {
    api.config().subscribe(result => {
      Object.keys(result).forEach(key => {
        this.configs.push(key)
      })
    })
  }
  ngOnInit(): void {
  }
  onSubmit(value) {
    this.api.addMachine(value).subscribe((result: any) => {

      if (result.success) {
        console.log(result)
        this.router.navigate(['/add-configs'])
      }
      else
        alert('Eklenemedi!!')

    })
    console.log(value)
  }

}
