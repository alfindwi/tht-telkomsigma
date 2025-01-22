<template>
    <div>
        <nav>
            <ul class="navbar">
                <li>
                    <router-link to="/" class="nav-link">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/management" class="nav-link">Management Data</router-link>
                </li>
            </ul>
        </nav>
    </div>
    <div class="container">
        <div class="date-filter">
            <label for="date">Date: </label>
            <input type="date" id="date" v-model="selectedDate" />
            <button id="btn-filter" @click="filterData" class="btn-filter">Filter</button>
            <button id="btn-reset" @click="resetData" class="btn-reset">Reset</button>
        </div>
        <div class="chart">
            <div id="columnChart" class="columnChart"></div>
            <div id="pieChart" class="pieChart"></div>
            <div id="genderPerMonthChart" class="monthChart"></div>
        </div>
    </div>
</template>

<script>
import Home from "../js/home";
export default {
    name:"Home",
    mixins: [Home],
}
</script>
