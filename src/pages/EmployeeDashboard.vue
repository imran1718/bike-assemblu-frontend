<template>
    <div class="fixed-center">
        <q-card  style="width:700px;" class="" v-if="selectBikeView">
                  <q-card-section class="text-center">
        <div class="text-h6">Select a Bike to Assemble</div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <div class="col">
            <q-btn @click="startAssembly('Bike 1')" color="green">Start Bike 1(50 minutes)</q-btn>
          </div>
          <div class="col">
            <q-btn @click="startAssembly('Bike 2')"  color="green">Start Bike 2(60 minutes)</q-btn>
          </div>
          <div class="col">
            <q-btn @click="startAssembly('Bike 3')"  color="green">Start Bike 3(80 minutes)</q-btn>
          </div>
        </div>
       
      </q-card-section>
                    <q-card-section class="text-center">
                      <q-btn @click="logout()" color="red">Logout</q-btn>
                    </q-card-section>
                </q-card>
                <q-card  style="width:700px;" class="" v-if="assemblyStart">
                  <q-card-section class="text-center">
        <div class="text-h6">Assembly Session {{ selectedBike }}</div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <div class="col">
            <span class="">Assembly Session Start : {{ startTime }}</span>
          </div>
          <div class="col">
            <span>Assembly Session End : {{ endTime }}</span>
          </div>
        </div>
       
      </q-card-section>
                    <q-card-section class="text-center ">
                      <q-btn class="q-mx-sm" v-if="assemblySession == 'end'" @click="selectBikeView = true,assemblyStart = false" color="primary">Back</q-btn>
                      <q-btn @click="endAssembly()" :disable="assemblySession == 'end'" color="red">End Assembly</q-btn>
                    </q-card-section>
                </q-card>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import moment from "moment-timezone";

export default {
  data(){
    return{
      assemblyStart:false,
      selectedBike:'',
      endTime:'',
      startTime:'',
      selectBikeView:true,
      assemblySession:''
    }
  },
  mounted(){
    this.assemblySession = localStorage.getItem('assemblySession')
    console.log("mounted",this.assemblySession);
    if(this.assemblySession === 'start'){
      console.log("=-=--");
      this.assemblyStart = true;
      this.selectBikeView = false
    }
  },
       methods: {
        startAssembly: function (bikeType) {
          this.selectedBike = bikeType
    console.log(bikeType);
    const data={
      employeeId:localStorage.getItem('employeeId'),
      bikeType:bikeType
    }
      const token = localStorage.getItem('token');

            return new Promise((resolve, reject) => {
              this.$api.post('/start/assembly',data, {
          headers: { Authorization: token }
        })
                    .then((response) => {
                       console.log(response.data.startTime);
                       this.selectBikeView = false
                           this.assemblyStart = true;
                           this.startTime =  moment(response.data.startTime).format("D / MM / YYYY hh:mm a");
                           localStorage.setItem('assemblySession','start')
                           this.assemblySession = localStorage.getItem('assemblySession')
                        resolve(response);
                    })
                    .catch((err) => {                       
                        reject(err);
                    });
            });
        },
        endAssembly: function () {
          const data ={
            employeeId:localStorage.getItem('employeeId')
          }
      const token = localStorage.getItem('token');

            return new Promise((resolve, reject) => {
              this.$api.post('/end/assembly',data)
                    .then((response) => {
                      console.log('Assembly ended');
                      this.endTime =  moment(response.data.endTime).format("D / MM / YYYY hh:mm a")
                      localStorage.setItem('assemblySession','end')
                      this.assemblySession = localStorage.getItem('assemblySession')
                        resolve(response);
                    })
                    .catch((err) => {                       
                        reject(err);
                    });
            });
        },
         logout(){
          Swal.fire({
                            title: "Good job!",
                            text: "Logout Successfully!",
                            icon: "success"
                          });
          localStorage.clear();
          this.$router.push('/')
         }
         
       }
     };
</script>