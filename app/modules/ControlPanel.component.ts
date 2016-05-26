import {Component, OnInit} from "@angular/core";

declare var firebase: any;

@Component({
  selector: "control-panel",
  templateUrl: "./app/modules/ControlPanel.html"
})

export class ControlPanelComponent implements OnInit {

  database: any;
  storage: any;

  constructor() {
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  ngOnInit() {

  }

  // upload() {
  //   for (var propi in json) {
  //     if (json.hasOwnProperty(propi)) {
  //       for (var propj in json[propi]) {
  //         if (json[propi].hasOwnProperty(propj)) {
  //           var key = propj.substr(0, propj.length - 4);
  //           console.log("key1", key);
  //           this.setdb(propi, propj, key);
  //         }
  //       }
  //     }
  //   }
  // }
  //
  // setdb(propi: string, propj: string, key: string) {
  //   var mThis = this;
  //   var image = this.storage.ref("products/" + propi + "/" + propj);
  //   image.getDownloadURL().then(function(url){
  //     var newRef = mThis.database.ref("products/" + propi + "/").push();
  //     newRef.child(key).set({
  //       "name": key,
  //       "enabled": 1,
  //       "image": url
  //     });
  //     console.log("key2", key);
  //   }, function(error){
  //     console.log(error);
  //   });
  // }
}
