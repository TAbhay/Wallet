import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from "react-google-charts";

export const TransactionCharts = () => {
    const { transactions } = useSelector(state => state.transactions)
    const [data, setData] = useState([]);
    const [edata, setEdata] = useState([]);
    const [idata, setIdata] = useState([]);
    useEffect(() => {
        var category = {}
        const value = []
        const value2 = []
        const value3 = []
        const cat = transactions.map(transaction => {
            // console.log(transaction)
            var key = transaction.category
            // console.log(key, "key")
            if (category[key] === undefined) {
                category[key] = [0, 0]
            }
            if (transaction.account === 'income') {
                category[key][0] += transaction.amount;
            }
            else {
                category[key][1] += transaction.amount;
            }

        })
        // console.log("cat", category)
        value.push(["Net Transaction", "income", "expense"])
        value2.push(["Net Transaction", "expense"])
        value3.push(["Net Transaction", "income"])
        for (const item in category) {
            value.push([item, category[item][0], category[item][1]])
            value2.push([item, category[item][1]])
            value3.push([item, category[item][0]])
        }
        setData(value)
        setIdata(value3)
        setEdata(value2)
        // console.log("data", data)
    }, [transactions])
    // const data = [
    //     ["City", "2010 Population", "2000 Population"],
    //     ["New York City, NY", 8175000, 8008000],
    //     ["Los Angeles, CA", 3792000, 3694000],
    //     ["Chicago, IL", 2695000, 2896000],
    //     ["Houston, TX", 2099000, 1953000],
    //     ["Philadelphia, PA", 1526000, 1517000],
    //   ];

    const options = {
        title: "Income and Expense per Category",
        chartArea: { width: "90%" },
        hAxis: {
            title: "Category",
            minValue: 0,
        },
        vAxis: {
            title: "Net Amount",
        },
    };
    const options2 = {
        title: "Income per Category",
        chartArea: { width: "90%" },
        hAxis: {
            title: "Category",
            minValue: 0,
        },
        vAxis: {
            title: "Net Amount",
        },
    };
    const options3 = {
        title: "Expense per Category",
        chartArea: { width: "90%" },
        hAxis: {
            title: "Category",
            minValue: 0,
        },
        vAxis: {
            title: "Net Amount",
        },
    };





    return (
        <>
            <h3>Charts</h3>
            <div >
                <div style={{padding: "15px",display: "flex",justifyContent: "center"}}>
                    <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                    />
                </div>
                <div style={{padding: "15px",display: "flex",justifyContent: "center"}}>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="300px"
                        data={idata}
                        options={options2}
                    />
                </div>
                <div style={{padding: "15px",display: "flex",justifyContent: "center"}}>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="300px"
                        data={edata}
                        options={options3}
                    />
                </div>
            </div>

        </>
    )
}
