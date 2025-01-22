import Highcharts from "highcharts";

export default {
    methods: {
        createGenderChart(users) {
            const genderCount = users.reduce(
                (acc, user) => {
                    if (user.gender === "Pria") {
                        acc.PRIA += 1;
                    } else if (user.gender === "Wanita") {
                        acc.WANITA += 1;
                    }
                    return acc;
                },
                { PRIA: 0, WANITA: 0 }
            );

            const chartData = [
                { name: "Pria", y: genderCount.PRIA },
                { name: "Wanita", y: genderCount.WANITA },
            ];

            Highcharts.chart("pieChart", {
                chart: {
                    type: "pie",
                },
                title: {
                    text: "Gender Distribution",
                },
                series: [
                    {
                        name: "Gender",
                        colorByPoint: true,
                        data: chartData,
                    },
                ],
            });
        },
    },
};
