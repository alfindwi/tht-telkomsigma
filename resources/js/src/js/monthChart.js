import Highcharts from "highcharts";

export default {
    methods: {
        createMonthChart(users) {
            const monthlyGenderCount = users.reduce((acc, user) => {
                const date = new Date(user.created_at);
                const month = date.toLocaleDateString("default", {
                    month: "long",
                    year: "numeric",
                });

                if (!acc[month]) {
                    acc[month] = { PRIA: 0, WANITA: 0 };
                }
                if (user.gender === "Pria") {
                    acc[month].PRIA += 1;
                } else if (user.gender === "Wanita") {
                    acc[month].WANITA += 1;
                }

                return acc;
            }, {});

            const categories = Object.keys(monthlyGenderCount);
            const maleData = categories.map(
                (month) => monthlyGenderCount[month].PRIA
            );
            const femaleData = categories.map(
                (month) => monthlyGenderCount[month].WANITA
            );

            Highcharts.chart("genderPerMonthChart", {
                chart: {
                    type: "column",
                    marginBottom: 89,
                },
                title: {
                    text: "Gender Distribution Per Month",
                },
                xAxis: {
                    categories: categories,
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: "10px",
                            fontFamily: "Verdana, sans-serif",
                        },
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Number of Users",
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: "bold",
                            color: "gray",
                        },
                    },
                },
                legend: {
                    enabled: false,
                },
                tooltip: {
                    headerFormat: "<b>{point.x}</b><br/>",
                    pointFormat:
                        "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
                },
                plotOptions: {
                    column: {
                        stacking: "normal",
                        dataLabels: {
                            enabled: true,
                        },
                    },
                },
                series: [
                    {
                        name: "Pria",
                        data: maleData,
                        color: "#1f78b4",
                    },
                    {
                        name: "Wanita",
                        data: femaleData,
                        color: "#e31a1c",
                    },
                ],
            });
        },
    },
};
