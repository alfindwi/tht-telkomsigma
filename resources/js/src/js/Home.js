import GenderPieChart from "../js/pieChart";
import ColumnChart from "../js/columnChart";
import MonthChart from "../js/monthChart";

export default {
    name: "Charts",
    data() {
        return {
            users: [],
            selectedDate: "",
        };
    },
    async created() {
        try {
            const response = await fetch("http://localhost:8000/api/users");
            this.users = await response.json();
            
            this.createGenderChart(this.users);
            this.createDateChart(this.users);
            this.createMonthChart(this.users);
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        filterData() {
            if (this.selectedDate) {
                const selectedDate = new Date(this.selectedDate).toISOString().split("T")[0];
                const filteredUsers = this.users.filter((user) => {
                    const userDate = new Date(user.created_at).toISOString().split("T")[0];
                    return userDate === this.selectedDate;
                });

                this.createDateChart(filteredUsers);
                this.createGenderChart(filteredUsers);
            } else {
                this.createDateChart(this.users);
                this.createGenderChart(this.users);
            }
        },
        resetData(){
            this.selectedDate = "";
            this.createDateChart(this.users);
            this.createGenderChart(this.users);
        }
    },
    mixins: [GenderPieChart, ColumnChart, MonthChart],
};