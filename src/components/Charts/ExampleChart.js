// import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);



const Pie3D = ({data}) => {
  const chartConfigs = {
    type: "pie3D",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Languages",
        showvalues: "1",
        showpercentintooltip: "0",
        numberprefix: "$",
        enablemultislicing: "1",
        theme: "candy",
      },
      data: data,
    },
  };
  
    return <ReactFC {...chartConfigs} />;
}

export default Pie3D;