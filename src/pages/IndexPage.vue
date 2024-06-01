<template>
  <div>
    <div class="row justify-center">
            <div class="col-12 col-md-6 self-center">
                <div>
                    <q-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuKVOqDch0KNccI4cI-PaidnseBRJCw6Su-w&s" 
                    style="">
                        <h2 class="text-center text-bold text-white q-mt-sm q-mr-md" style="font-family: system-ui">
                            Bike Assembly
                        </h2>
                    </q-img>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="" style="margin-top: 10rem; margin-left: 8rem">
                    <h4 class="text-bold" style="margin-left: 6rem">Sign In</h4>

                    <div>
                        <q-card flat>
                            <div>
                                <q-input v-model="username" class="" outlined placeholder="Email (or) Mobile number"
                                    style="width: 20rem"></q-input>

                                <br />

                                
                                <q-input outlined v-model="password" :rules="[
                                    (val) => (val && val.length > 0) || 'Field is required.',
                                ]" :type="isPwd ? 'password' : 'text'" @keyup.enter="userLogin" placeholder="Password"
                                    style="width: 20rem" class="">
                                    <template v-slot:append>
                                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                            @click="isPwd = !isPwd" />
                                    </template>
                                </q-input>

                                <br />
                                <q-btn class="btn-fixed-width q-mb-md" @click="userLogin()" color="primary"
                                    label="SIGN IN" style="width: 20rem" />
                            </div>
                            
                        </q-card>
                    </div>
                </div>
            </div>
        </div>
        <!-- <q-dialog v-model="dialogVisible" transition-duration="400" transition-show="scale" transition-hide="scale"
                no-backdrop-dismiss>
                <q-card dark="" style="width:400px">
                  <q-card-section>
        <div class="text-h6">Select a Bike to Assemble</div>
      </q-card-section>

      <q-list bordered>
        <q-item v-for="bike in bikes" :key="bike.id" >
          <q-item-section><input type="radio" :value="bike.id" v-model="selectedBike" ></q-item-section>
          <q-item-section>{{ bike.name }}</q-item-section>
          <q-item-section>{{ bike.assemblyTime }} minutes</q-item-section>
        </q-item>
      </q-list>
                    <q-card-section class="text-center">
                        <q-btn color="grey" @click="closeDialog()" outline label="cancel" class="q-mx-sm"></q-btn>
                        <q-btn color="grey-9" @click="startAssembly(selectedBike)" label="confirm"></q-btn>

                    </q-card-section>
                </q-card>
            </q-dialog> -->
      </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      username: '',
      password: '',
      isPwd:true,
      dialogVisible:false,
      selectedBike:null,
      bikes: [
        { id: 1, name: 'Bike 1', assemblyTime: 50 },
        { id: 2, name: 'Bike 2', assemblyTime: 60 },
        { id: 3, name: 'Bike 3', assemblyTime: 80 }      
      ]
    };
  },
  methods: {
    signup: function () {
      const data={
        username : this.username,
        password:this.password
      }
            return new Promise((resolve, reject) => {
              this.$api.post('/signup',data)
                    .then((response) => {
                       console.log(response.data);
                               
                        resolve(response);
                    })
                    .catch((err) => {                       
                        reject(err);
                    });
            });
        },
    userLogin: function () {
      const data={
        username : this.username,
        password:this.password
      }
            return new Promise((resolve, reject) => {
              this.$api.post('/login',data)
                    .then((response) => {
                       console.log(response.data);
                        localStorage.setItem('token', response.data.token);
                        // this.dialogVisible = true
                        Swal.fire({
                            title: "Good job!",
                            text: "Login Successfully!",
                            icon: "success"
                          });
                        this.getUser()
                        resolve(response);
                    })
                    .catch((err) => {    
                      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Username or password incorrect!",
});                   
                        reject(err);
                    });
            });
        },
        getUser: function () {
     
            return new Promise((resolve, reject) => {
              this.$api.get('/getUser/'+ this.username)
                    .then((response) => {
                       console.log(response.data.employee[0]);
                       
                               localStorage.setItem('employeeId', response.data.employee[0].employeeId);
                               localStorage.setItem('role',response.data.employee[0].role)
                               if(response.data.employee[0].role == 'assembler'){

                                 this.$router.push('/employeeDashboard')
                               }else if(response.data.employee[0].role == 'admin'){
                                this.$router.push('/adminDashboard')
                               }
                        // this.dialogVisible = true
                        resolve(response);
                    })
                    .catch((err) => {                       
                        reject(err);
                    });
            });
        },
        startAssembly: function (bikeId) {
    console.log(bikeId);
      const token = localStorage.getItem('token');

            return new Promise((resolve, reject) => {
              this.$api.post('/start-assembly',{ bikeId }, {
          headers: { Authorization: token }
        })
                    .then((response) => {
                       console.log(response.data);
                               
                        resolve(response);
                    })
                    .catch((err) => {                       
                        reject(err);
                    });
            });
        },
  }
};
</script>
