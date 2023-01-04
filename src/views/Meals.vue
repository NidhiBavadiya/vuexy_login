 <template>
  <div>
    <addForm
      :isActive="SideForm"
      :items="items"
      @closeSidebar="SideForm = !SideForm"
    ></addForm>
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <!-- Search -->
          <b-col cols="12">
            <div class="d-flex align-items-center justify-content-end">
              <!-- <router-link to="/add"> -->
              <b-button variant="primary">
                <span class="text-nowrap" @click="openform()">Add Meals</span>
              </b-button>
              <!-- </router-link> -->
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table ref="refUserListTable" :items="items" :fields="fields">
        <template #cell(actions)="data">
          
          <!--="data" -->
          <!-- <router-link :to="'/edit/'+ data.item.id">  -->
          <feather-icon
            class="ml-1 cursor-pointer text-success"
            icon="Edit2Icon"
            size="16"
            @click="EditData()"
          />
          <!-- </router-link> -->

          <feather-icon
            class="ml-1 cursor-pointer text-danger"
            icon="Trash2Icon"
            size="16"
            @click="deleteData(data.item.id)"
          />
        </template>
      </b-table>
    </b-card>
  </div>
</template>
<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
} from "bootstrap-vue";
import AddForm from "../components/AddForm.vue";
export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    AddForm,
  },
  data() {
    return {
      fields: [
        {
          key: "actions",
          label: "Actions",
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "restaurant_name",
          label: "Restaurant Name",
        },
        {
          key: "AED_cost",
          label: "AED_cost",
        },
        {
          key: "USD_cost",
          label: " usd_cost",
        },
        {
          key: "cost_unit",
          label: "Cost_Unit",
        },
        {
          key: "USD_price",
          label: "USD_price",
        },
        {
          key: "AED_price",
          label: "AED_price",
        },
        {
          key: "description",
          label: "Description",
        },
        {
          key: "margin",
          label: "Margin",
        },
      ],
      // EditedValue : {
      //   restaurant_name:'' ,
      //   type: '',
      //   description: '',
      //   option:'',
      //   AED_cost: null,
      //   USD_cost: null,
      //   cost_unit:null,
      //   margin: null,
      //   priceUnit:null,
      //   USD_price:null,
      //   AED_price: null,
      // },
      items: [],
      SideForm: false,
    };
  },

  mounted() {
  this.ListApi();
  },

  methods: {
    ListApi() {
      // let token = localStorage.getItem('token');
      console.log(this.token);
      // POST request using axios with error handling
      this.axios.defaults.headers.common["Authorization"] ="Bearer " + this.token;
      this.axios.post("meal/list")
        .then((response) => {
          console.log("response.data",response.data.data.meals);
          this.items = response.data.data.meals;
         
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    deleteData(index) {
      // this.items.splice(index,1);
      console.log(index);
      this.axios.defaults.headers.common["Authorization"] ="Bearer " + this.token;
      this.axios.post("meal/delete",{'id' :index})
        .then((response) => {
          console.log("response.data",response.data.data.meals);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    openform() {
      this.SideForm = !this.SideForm;
    },
    EditData(index) {
      this.SideForm = !this.SideForm;
      console.log(index);
      this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
      this.axios.post("meal/update",{'id' :index})
        .then((response) => {
          console.log("response.data",response.data.data.meals);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
