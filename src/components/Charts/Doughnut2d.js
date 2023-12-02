
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Pie3D = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d",
    width: "100%",
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stars Per Languages",
        showvalues: "1",
        enablemultislicing: "1",
        theme: "candy",
        decimals: 0,
        doughnutRadius: "35%",
        showPercentValues: 0,
      },
      data: data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default Pie3D;
