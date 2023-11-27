import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as testPlayers from '../assets/test_players.json';

type Player = {
  name: string;
  position: string;
  attackRating: number;
  defenceRating: number;
  conditionRating: number;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private mockPlayerList: Player[] = testPlayers.players;

  protected isFirst: boolean = true;
  protected positions: string[] = ['Midfielder', 'Defender', 'GK', 'Striker'];
  protected ratings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  protected numOfPlayers: number = 0;

  protected playerForms: FormGroup = new FormGroup({
    players: new FormArray<FormGroup>([]),
  });

  protected generateFormFields(): void {
    let formArr = new FormArray<FormGroup>([]);
    for (let i = 0; i < this.numOfPlayers; i++) {
      let form = new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required]),
        position: new FormControl<string | null>(null, [Validators.required]),
        defenceRating: new FormControl<number | null>(null, [
          Validators.required,
        ]),
        attackRating: new FormControl<number | null>(null, [
          Validators.required,
        ]),
        conditionRating: new FormControl<number | null>(null, [
          Validators.required,
        ]),
      });
      formArr.push(form);
    }

    this.playerForms.controls['players'] = formArr;
    this.isFirst = false;
  }

  protected getAsFormArray(formArray: any): FormArray {
    return formArray as FormArray;
  }

  protected getAsFormGroup(fromGroup: any): FormGroup {
    return fromGroup as FormGroup;
  }

  protected generateTeams(): void {
    let isAllValid = true;
    for (let playerForm of (this.playerForms.controls['players'] as FormArray)
      .controls) {
      if (playerForm.valid) {
        console.log(playerForm.value);
      } else {
        playerForm.markAllAsTouched();
        isAllValid = false;
      }
    }

    if (isAllValid) {
      console.log('all valid!');
    }
  }

  protected clean(): void {
    this.numOfPlayers = 0;
    this.playerForms = new FormGroup({
      players: new FormArray<FormGroup>([]),
    });

    this.isFirst = true;
  }

  protected addNewPlayer(): void {
    let form = new FormGroup({
      name: new FormControl<string | null>(null, [Validators.required]),
      position: new FormControl<string | null>(null, [Validators.required]),
      defenceRating: new FormControl<number | null>(null, [
        Validators.required,
      ]),
      attackRating: new FormControl<number | null>(null, [Validators.required]),
      conditionRating: new FormControl<number | null>(null, [
        Validators.required,
      ]),
    });
    (this.playerForms.controls['players'] as FormArray).push(form);
    this.numOfPlayers++;
  }

  protected deletePlayer(index: number): void {
    (this.playerForms.controls['players'] as FormArray).removeAt(index);
    this.numOfPlayers--;

    if (this.numOfPlayers < 1) this.isFirst = true;
  }

  protected test(): void {
    this.numOfPlayers = this.mockPlayerList.length;
    let formArr = new FormArray<FormGroup>([]);
    for (let player of this.mockPlayerList) {
      let form = new FormGroup({
        name: new FormControl<string | null>(player.name, [
          Validators.required,
        ]),
        position: new FormControl<string | null>(player.position, [
          Validators.required,
        ]),
        defenceRating: new FormControl<number | null>(player.defenceRating, [
          Validators.required,
        ]),
        attackRating: new FormControl<number | null>(player.attackRating, [
          Validators.required,
        ]),
        conditionRating: new FormControl<number | null>(
          player.conditionRating,
          [Validators.required]
        ),
      });
      formArr.push(form);
    }
    this.playerForms.controls['players'] = formArr;
    this.isFirst = false;
  }
}
