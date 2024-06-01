<template>
  <div class="q-pa-md">
    <q-card style="width: 500px;" class="q-my-md">
      <q-card-section>
        <h4 class="text-bold" style="">Total Bikes Assembled</h4>
        <q-input v-model="fromDate" label="From" type="date" />
        <q-input v-model="toDate" label="To" type="date" />
        <q-btn @click="fetchBikesAssembled">Fetch</q-btn>
      </q-card-section>
      <q-card-section>
        <q-bar-chart :data="bikesAssembledData" />
        <div v-if="bikesAssembledData.length != 0">
             <p>Total Bikes Assembled: {{ bikesAssembledData }}</p>
           </div>
      </q-card-section>
      <q-card-section class="text-center">
                      <q-btn @click="logout()" color="red">Logout</q-btn>
                    </q-card-section>
    </q-card>   

    <!-- <q-card style="width: 500px;"  class="q-my-md">
      <q-card-section>
        <q-input v-model="productionDate" label="Date" type="date" />
        <q-btn @click="fetchEmployeeProduction">Fetch</q-btn>
      </q-card-section>
      <q-card-section>
        <q-bar-chart :data="employeeProductionData" />
        <div v-if="employeeProductionData.length != 0">
             <p>Total Bikes Assembled: {{ employeeProductionData }}</p>
           </div>
      </q-card-section>
    </q-card> -->
  </div>
</template>

<script>

import Swal from 'sweetalert2'

export default {
  name: 'AdminDashboard',
  data(){
    return{
      fromDate:'',
      toDate:'',
      bikesAssembledData:[],
      employeeProductionData:[],
      productionDate:''
    }
  },
  methods:{
    fetchBikesAssembled: function () {
         
    const data={
      from: this.fromDate, to: this.toDate
    }
    console.log(data);
            return new Promise((resolve, reject) => {
              this.$api.post('/metrics/bikes-assembled',data)
                    .then((response) => {
                       console.log(response.data);
                        this.bikesAssembledData = response.data.count
                        resolve(response);
                    })
                    .catch((err) => {                       
                        reject(err);
                    });
            });
        },
        fetchEmployeeProduction: function () {
         
         const data={
          date: this.productionDate
         }
         console.log(data);
                 return new Promise((resolve, reject) => {
                   this.$api.post('/metrics/employee-production',data)
                         .then((response) => {
                            console.log(response.data);
                             this.employeeProductionData = response.data.count
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
