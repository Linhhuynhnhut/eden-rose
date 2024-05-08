import React from 'react';
import { Line } from '@ant-design/charts';
const data = [
    { month: 'Jan', revenue: 20000, category: 'Hall A' },
    { month: 'Feb', revenue: 40000, category: 'Hall A' },
    { month: 'Mar', revenue: 30000, category: 'Hall A' },
    { month: 'Apr', revenue: 35000, category: 'Hall A' },
    { month: 'May', revenue: 32000, category: 'Hall A' },
    { month: 'Jun', revenue: 34000, category: 'Hall A' },
    { month: 'Jul', revenue: 37000, category: 'Hall A' },
    { month: 'Aug', revenue: 36000, category: 'Hall A' },
    { month: 'Sep', revenue: 38000, category: 'Hall A' },

    { month: 'Jan', revenue: 15000, category: 'Hall B' },
    { month: 'Feb', revenue: 30000, category: 'Hall B' },
    { month: 'Mar', revenue: 25000, category: 'Hall B' },
    { month: 'Apr', revenue: 26000, category: 'Hall B' },
    { month: 'May', revenue: 24000, category: 'Hall B' },
    { month: 'Jun', revenue: 25000, category: 'Hall B' },
    { month: 'Jul', revenue: 28000, category: 'Hall B' },
    { month: 'Aug', revenue: 27000, category: 'Hall B' },
    { month: 'Sep', revenue: 29000, category: 'Hall B' },

    { month: 'Jan', revenue: 10000, category: 'Hall C' },
    { month: 'Feb', revenue: 20000, category: 'Hall C' },
    { month: 'Mar', revenue: 35000, category: 'Hall C' },
    { month: 'Apr', revenue: 30000, category: 'Hall C' },
    { month: 'May', revenue: 31000, category: 'Hall C' },
    { month: 'Jun', revenue: 32000, category: 'Hall C' },
    { month: 'Jul', revenue: 33000, category: 'Hall C' },
    { month: 'Aug', revenue: 34000, category: 'Hall C' },
    { month: 'Sep', revenue: 36000, category: 'Hall C' },
];

const RevenueChart = React.memo(() => {

    const config = {
        autoFit: true,
        data,
        xField: 'month',
        yField: 'revenue',
        seriesField: 'category',
        yAxis: {
            label: {
                formatter: (v) => `$${v}`,
            },
        },
        smooth: true,
        color: ({ category }) => {
            switch (category) {
                case 'Hall A':
                    return '#A800FF'; // Purple
                case 'Hall B':
                    return '#FF5733'; // Orange
                case 'Hall C':
                    return '#00BAFF'; // Blue
                default:
                    return '#ccc'; // Fallback color
            }
        },
    };

    return <Line {...config} />;
});

export default RevenueChart;
