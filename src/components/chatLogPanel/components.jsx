import './components.css';
import frameSVG from '../../assets/frame.svg';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

import loadingSVG from '../../assets/loading.svg';
import tickSVG from '../../assets/tick.svg';

export function UserLog({ data }) {
  return (
    <div className="user_log">
      { data }
    </div>
  );
}

export function GptLog({ data }) {
  const { title, answer, chartDatas } = data;

  return (
    <>
      <GptLoadingSign isLoading={ answer === undefined || chartDatas === undefined } />
      <div className="gpt_log">
        <div className="gpt_log_title">
          { title }
          <img alt='frame' src={ frameSVG } />
        </div>
        <div className="gpt_log_content">{ answer ?? "" }</div>
        {
          chartDatas?.map((chartData, index) => 
            <KChart key={ index } data={ chartData } />
          )
        }
      </div>
    </>
  );
}

export function GptLoadingSign({ isLoading }) {
  return (
    <div className={"gpt_loading_sign" + (isLoading ? " loading" : "")}>
      <img alt='正在分析' src={ isLoading ? loadingSVG : tickSVG } />
      { isLoading ? '正在分析…' : '分析完成' }
    </div>
  )
}

function KChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      const option = Object.assign(
        {},
        data.type === 'stackbar' ? stackbarOption
        : (data.type === 'stackline' || data.type === 'szzs') ? candleOption
        : null,
        {
          title: { text: data.name },
          dataset: { source: data.data }
        }
      );

      console.log(data, option);

      const chart = echarts.init(chartRef.current);
      chart.setOption(option);
    }
  }, [ data ]);

  return (
    <div className="gpt_log_chart" ref={ chartRef } />
  );
}

const candleOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  xAxis: {
    type: 'category',
    inverse: true
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true
    }
  },
  series: [{
    type: 'candlestick',
    encode: {
      x: 'trade_date',
      y: ['open', 'close', 'low', 'high'],
      tooltip: ['open', 'close', 'low', 'high']
    }
  }]
};

const stackbarOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: "category",
  },
  yAxis: [
    {
      type: "value"
    },
    {
      type: "value",
      alignTicks: true,
      min: value => -Math.max(Math.abs(value.min), Math.abs(value.max)),
      max: value => Math.max(Math.abs(value.min), Math.abs(value.max))
    }
  ],
  series: [
    {
      type: "bar",
      name: "特大单买入量",
      stack: "elg_vol",
      yAxisIndex: 1,
      barWidth: 7,
      encode: {
        x: "trade_date",
        y: "buy_elg_vol",
      },
    },
    {
      type: "bar",
      name: "特大单卖出量",
      stack: "elg_vol",
      yAxisIndex: 1,
      encode: {
        x: "trade_date",
        y: "sell_elg_vol",
      },
    },
    {
      type: "bar",
      name: "特大单买入金额",
      stack: "elg_amount",
      encode: {
        x: "trade_date",
        y: "buy_elg_amount",
      },
    },
    {
      type: "bar",
      name: "特大单卖出金额",
      stack: "elg_amount",
      encode: {
        x: "trade_date",
        y: "sell_elg_amount",
      },
    },
    {
      type: "bar",
      name: "大单买入量",
      stack: "lg_vol",
      yAxisIndex: 1,
      barWidth: 7,
      encode: {
        x: "trade_date",
        y: "buy_lg_vol",
      },
    },
    {
      type: "bar",
      name: "大单卖出量",
      stack: "lg_vol",
      yAxisIndex: 1,
      encode: {
        x: "trade_date",
        y: "sell_lg_vol",
      },
    },
    {
      type: "bar",
      name: "大单买入金额",
      stack: "lg_amount",
      encode: {
        x: "trade_date",
        y: "buy_lg_amount",
      },
    },
    {
      type: "bar",
      name: "大单卖出金额",
      stack: "lg_amount",
      encode: {
        x: "trade_date",
        y: "sell_lg_amount",
      },
    },
    {
      type: "bar",
      name: "中单买入量",
      stack: "md_vol",
      yAxisIndex: 1,
      barWidth: 7,
      encode: {
        x: "trade_date",
        y: "buy_md_vol",
      },
    },
    {
      type: "bar",
      name: "中单卖出量",
      stack: "md_vol",
      yAxisIndex: 1,
      encode: {
        x: "trade_date",
        y: "sell_md_vol",
      },
    },
    {
      type: "bar",
      name: "中单买入金额",
      stack: "md_amount",
      encode: {
        x: "trade_date",
        y: "buy_md_amount",
      },
    },
    {
      type: "bar",
      name: "中单卖出金额",
      stack: "md_amount",
      encode: {
        x: "trade_date",
        y: "sell_md_amount",
      },
    },
    {
      type: "bar",
      name: "小单买入量",
      stack: "sm_vol",
      yAxisIndex: 1,
      barWidth: 7,
      encode: {
        x: "trade_date",
        y: "buy_sm_vol",
      },
    },
    {
      type: "bar",
      name: "小单卖出量",
      stack: "sm_vol",
      yAxisIndex: 1,
      encode: {
        x: "trade_date",
        y: "sell_sm_vol",
      },
    },
    {
      type: "bar",
      name: "小单买入金额",
      stack: "sm_amount",
      encode: {
        x: "trade_date",
        y: "buy_sm_amount",
      },
    },
    {
      type: "bar",
      name: "小单卖出金额",
      stack: "sm_amount",
      encode: {
        x: "trade_date",
        y: "sell_sm_amount",
      },
    },
    {
      type: "line",
      name: "净流入额",
      encode: {
        x: "trade_date",
        y: "net_mf_amount",
      },
    }
  ],
};