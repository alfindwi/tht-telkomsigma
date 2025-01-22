import Highcharts from "highcharts";

export default {
  methods: {
    createDateChart(users) {
      const dateCount = users.reduce((acc, user) => {
        const date = new Date(user.created_at).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const sortDates = Object.keys(dateCount).sort()

      const chartData = sortDates.map((date) => ({
        name: date,
        y: dateCount[date],
      }));

      Highcharts.chart("columnChart", {
        chart: {
          type: "column",
        },
        title: {
          text: "User Sign-Ups by Date",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            text: "Number of Users",
          },
        },
        series: [
          {
            name: "Users",
            data: chartData,
          },
        ],
      });
    },
  },
};
