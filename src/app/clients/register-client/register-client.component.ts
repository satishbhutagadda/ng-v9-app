import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface skill {
  skillID: number;
  skillName: string;
}

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.scss']
})
export class RegisterClientComponent implements OnInit {
  clientForm: FormGroup;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  skills: skill[] = [
    { skillID: 1, skillName: 'HTML' },
    { skillID: 2, skillName: 'CSS' },
    { skillID: 3, skillName: 'JavaScript' },
    { skillID: 4, skillName: 'Bootstrap' },
    { skillID: 5, skillName: 'Angular' },
    { skillID: 6, skillName: 'JSON' },
  ];
  selectedSkills: skill[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setValues();
  }

  initForm() {
    this.clientForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      skills: [null, [Validators.required]]
    });
  }

  private setValues(){
    const value = {
      firstName: 'Satish',
      lastName: 'Bhutagadda',
      skills: [1, 3]
    }
    this.mapSelectedSkills([1, 3]);
    this.clientForm.patchValue(value);
  }

  mapSelectedSkills(skills: any[]){
    skills.map(id => {
      this.selectedSkills.push(this.skills.find(skill => skill.skillID === id));
    })
  }

  updateSelectedSkills(){
    this.selectedSkills = [];
    this.mapSelectedSkills(this.clientForm.get('skills').value);
  }

  onSubmit(){
    if(this.clientForm.valid){
      console.log(this.clientForm.value);
    }
  }

  log(data){
    console.log(data);
  }

}
