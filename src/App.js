import React, { useState, useEffect } from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Slider from '@vkontakte/vkui/dist/components/Slider/Slider';

import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import Button from '@vkontakte/vkui/dist/components/Button/Button';

import '@vkontakte/vkui/dist/vkui.css';

const fethedData = {
	all: JSON.parse("{\"lastChunk\":false,\"stocks\":[{\"chpu\":\"/stockInfo/moex-akcii/lsr\",\"imageUrl\":\"/img/storestocks/shop/19736.png\",\"title\":\"Группа ЛСР ао\",\"potentialPercent\":null,\"id\":19736,\"price\":741.7000000000,\"decp\":1,\"priceFormatted\":\"741,7 руб.\",\"percentChange\":6.51515,\"percentChangeFormatted\":\"+ 6,52%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/ogk-2\",\"imageUrl\":\"/img/storestocks/shop/18684.png\",\"title\":\"ОГК-2 ао\",\"potentialPercent\":null,\"id\":18684,\"price\":0.7937000000,\"decp\":4,\"priceFormatted\":\"0,7937 руб.\",\"percentChange\":4.44259,\"percentChangeFormatted\":\"+ 4,44%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/mosenrg\",\"imageUrl\":\"/img/storestocks/shop/6.png\",\"title\":\"МосЭнерго ао\",\"potentialPercent\":null,\"id\":6,\"price\":2.2751000000,\"decp\":4,\"priceFormatted\":\"2,2751 руб.\",\"percentChange\":4.35519,\"percentChangeFormatted\":\"+ 4,36%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/magnit\",\"imageUrl\":\"/img/storestocks/shop/17086.png\",\"title\":\"Магнит ао\",\"potentialPercent\":null,\"id\":17086,\"price\":4223.6000000000,\"decp\":1,\"priceFormatted\":\"4223,6 руб.\",\"percentChange\":4.18848,\"percentChangeFormatted\":\"+ 4,19%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/intuit-inc\",\"imageUrl\":\"/img/storestocks/shop/478906.png\",\"title\":\"Intuit\",\"potentialPercent\":null,\"id\":478906,\"price\":21240.8200000000,\"decp\":2,\"priceFormatted\":\"21240,82 руб.\",\"percentChange\":2.83,\"percentChangeFormatted\":\"+ 2,83%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/rostelecom\",\"imageUrl\":\"/img/storestocks/shop/7.png\",\"title\":\"Ростелеком ао\",\"potentialPercent\":null,\"id\":7,\"price\":91.6400000000,\"decp\":2,\"priceFormatted\":\"91,64 руб.\",\"percentChange\":2.72189,\"percentChangeFormatted\":\"+ 2,72%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/square-inc-class-a\",\"imageUrl\":\"/img/storestocks/shop/490578.png\",\"title\":\"Square\",\"potentialPercent\":null,\"id\":490578,\"price\":7349.1200000000,\"decp\":2,\"priceFormatted\":\"7349,12 руб.\",\"percentChange\":2.35,\"percentChangeFormatted\":\"+ 2,35%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/lukoil\",\"imageUrl\":\"/img/storestocks/shop/8.png\",\"title\":\"Лукойл ао\",\"potentialPercent\":null,\"id\":8,\"price\":5761.9000000000,\"decp\":1,\"priceFormatted\":\"5761,9 руб.\",\"percentChange\":2.11333,\"percentChangeFormatted\":\"+ 2,11%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/polus-zoloto\",\"imageUrl\":\"/img/storestocks/shop/17123.png\",\"title\":\"Полюс ао\",\"potentialPercent\":null,\"id\":17123,\"price\":11676.2000000000,\"decp\":1,\"priceFormatted\":\"11676,2 руб.\",\"percentChange\":2.00461,\"percentChangeFormatted\":\"+ 2,00%\",\"increased\":true}]}"),
	month: JSON.parse("{\"lastChunk\":false,\"stocks\":[{\"chpu\":\"/stockInfo/np-rts/spot-contract-alcoa-inc-with-tplus3-settlement\",\"imageUrl\":\"/img/storestocks/shop/419885.png\",\"title\":\"Alcoa Inc\",\"potentialPercent\":null,\"id\":419885,\"price\":870.2400000000,\"decp\":2,\"priceFormatted\":\"870,24 руб.\",\"percentChange\":38.66667,\"percentChangeFormatted\":\"+ 38,67%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/spot-contract-the-boeing-company-with-tplus3-settlement\",\"imageUrl\":\"/img/storestocks/shop/419910.png\",\"title\":\"THE BOEING COMPANY\",\"potentialPercent\":null,\"id\":419910,\"price\":14197.8400000000,\"decp\":2,\"priceFormatted\":\"14197,84 руб.\",\"percentChange\":34.39481,\"percentChangeFormatted\":\"+ 34,39%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/synchrony-financial\",\"imageUrl\":\"/img/storestocks/shop/481491.png\",\"title\":\"Synchrony Financial\",\"potentialPercent\":null,\"id\":481491,\"price\":1793.9300000000,\"decp\":2,\"priceFormatted\":\"1793,93 руб.\",\"percentChange\":31.68478,\"percentChangeFormatted\":\"+ 31,68%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/spot-contract-delta-air-lines-inc-with-tplus3-settlement\",\"imageUrl\":\"/img/storestocks/shop/419905.png\",\"title\":\"Delta Air Lines, Inc.\",\"potentialPercent\":null,\"id\":419905,\"price\":2241.3000000000,\"decp\":2,\"priceFormatted\":\"2241,30 руб.\",\"percentChange\":27.37069,\"percentChangeFormatted\":\"+ 27,37%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/rusgidro\",\"imageUrl\":\"/img/storestocks/shop/20266.png\",\"title\":\"РусГидро ао\",\"potentialPercent\":null,\"id\":20266,\"price\":0.8586000000,\"decp\":4,\"priceFormatted\":\"0,8586 руб.\",\"percentChange\":24.81595,\"percentChangeFormatted\":\"+ 24,82%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/spot-contract-tesla-motors-inc-with-tplus3-settlement\",\"imageUrl\":\"/img/storestocks/shop/420089.png\",\"title\":\"Tesla, Inc.\",\"potentialPercent\":null,\"id\":420089,\"price\":74413.1700000000,\"decp\":2,\"priceFormatted\":\"74413,17 руб.\",\"percentChange\":21.50067,\"percentChangeFormatted\":\"+ 21,50%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/lsr\",\"imageUrl\":\"/img/storestocks/shop/19736.png\",\"title\":\"Группа ЛСР ао\",\"potentialPercent\":null,\"id\":19736,\"price\":741.7000000000,\"decp\":1,\"priceFormatted\":\"741,7 руб.\",\"percentChange\":19.84316,\"percentChangeFormatted\":\"+ 19,84%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/square-inc-class-a\",\"imageUrl\":\"/img/storestocks/shop/490578.png\",\"title\":\"Square\",\"potentialPercent\":null,\"id\":490578,\"price\":7230.0700000000,\"decp\":2,\"priceFormatted\":\"7230,07 руб.\",\"percentChange\":19.31204,\"percentChangeFormatted\":\"+ 19,31%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/ogk-2\",\"imageUrl\":\"/img/storestocks/shop/18684.png\",\"title\":\"ОГК-2 ао\",\"potentialPercent\":null,\"id\":18684,\"price\":0.7937000000,\"decp\":4,\"priceFormatted\":\"0,7937 руб.\",\"percentChange\":18.62189,\"percentChangeFormatted\":\"+ 18,62%\",\"increased\":true}]}"),
	year: JSON.parse("{\"lastChunk\":false,\"stocks\":[{\"chpu\":\"/stockInfo/np-rts/spot-contract-tesla-motors-inc-with-tplus3-settlement\",\"imageUrl\":\"/img/storestocks/shop/420089.png\",\"title\":\"Tesla, Inc.\",\"potentialPercent\":null,\"id\":420089,\"price\":74413.1700000000,\"decp\":2,\"priceFormatted\":\"74413,17 руб.\",\"percentChange\":351.26468,\"percentChangeFormatted\":\"+ 351,26%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/nvidia-corporation\",\"imageUrl\":\"/img/storestocks/shop/462849.png\",\"title\":\"Nvidia\",\"potentialPercent\":null,\"id\":462849,\"price\":27328.2200000000,\"decp\":2,\"priceFormatted\":\"27328,22 руб.\",\"percentChange\":143.9588,\"percentChangeFormatted\":\"+ 143,96%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/polus-zoloto\",\"imageUrl\":\"/img/storestocks/shop/17123.png\",\"title\":\"Полюс ао\",\"potentialPercent\":null,\"id\":17123,\"price\":11676.2000000000,\"decp\":1,\"priceFormatted\":\"11676,2 руб.\",\"percentChange\":90.63819,\"percentChangeFormatted\":\"+ 90,64%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/spot-contract-apple-inc-with-tplus3-settlement\",\"imageUrl\":\"/img/storestocks/shop/419805.png\",\"title\":\"Apple Inc\",\"potentialPercent\":null,\"id\":419805,\"price\":26068.5000000000,\"decp\":2,\"priceFormatted\":\"26068,50 руб.\",\"percentChange\":75.22659,\"percentChangeFormatted\":\"+ 75,23%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/mostotrest\",\"imageUrl\":\"/img/storestocks/shop/74549.png\",\"title\":\"МОСТОТРЕСТ ао\",\"potentialPercent\":null,\"id\":74549,\"price\":165.8500000000,\"decp\":2,\"priceFormatted\":\"165,85 руб.\",\"percentChange\":73.31863,\"percentChangeFormatted\":\"+ 73,32%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/apteki-36-6\",\"imageUrl\":\"/img/storestocks/shop/13855.png\",\"title\":\"Аптечная сеть 36,6 ао\",\"potentialPercent\":null,\"id\":13855,\"price\":14.6120000000,\"decp\":3,\"priceFormatted\":\"14,612 руб.\",\"percentChange\":56.49718,\"percentChangeFormatted\":\"+ 56,50%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/spot-contract-micron-technology-inc-with-tplus3-settlement\",\"imageUrl\":\"/img/storestocks/shop/419830.png\",\"title\":\"Micron Technology, Inc.\",\"potentialPercent\":null,\"id\":419830,\"price\":3769.2800000000,\"decp\":2,\"priceFormatted\":\"3769,28 руб.\",\"percentChange\":52.21053,\"percentChangeFormatted\":\"+ 52,21%\",\"increased\":true},{\"chpu\":\"/stockInfo/moex-akcii/surgut\",\"imageUrl\":\"/img/storestocks/shop/4.png\",\"title\":\"Сургутнефтегаз ао\",\"potentialPercent\":null,\"id\":4,\"price\":41.2450000000,\"decp\":3,\"priceFormatted\":\"41,245 руб.\",\"percentChange\":51.38432,\"percentChangeFormatted\":\"+ 51,38%\",\"increased\":true},{\"chpu\":\"/stockInfo/np-rts/spot-contract-newmont-mining-corporation-with-tplus3-settlement\",\"imageUrl\":\"/img/storestocks/shop/419895.png\",\"title\":\"NEWMONT MINING CORPORATION\",\"potentialPercent\":null,\"id\":419895,\"price\":4148.0600000000,\"decp\":2,\"priceFormatted\":\"4148,06 руб.\",\"percentChange\":51.13817,\"percentChangeFormatted\":\"+ 51,14%\",\"increased\":true}]}")
}

const filters = {
	all: {
		title: 'Все'
	},
	year: {
		title: 'За год'
	},
	month: {
		title: 'За месяц'
	}
}

class App extends React.Component {
	constructor(props) {
	  super(props);
  
	  this.state = {
		activePanel: 'search',
		activeStock: null,
		activeFilter: 'all', 
		count: 1
	  }
	}

	handleFilter = (e) => {
		this.setState({
			activeFilter: e.currentTarget.value
		});
	}

	render() {
		const {activeFilter, activeStock} = this.state;

		return (
			<View activePanel={this.state.activePanel}>
				<Panel id="search">
					<PanelHeader>
						<div style={{textAlign:"center"}}>
							Акции
						</div>
					</PanelHeader>
					<Group>
						<FormLayout>
							<div style={{display: 'flex', alignItems: 'baseline'}}>
								<Radio name="radio" value="all" onChange={this.handleFilter} defaultChecked={activeFilter === 'all'}>Все</Radio>
								<Radio name="radio" value="year" onChange={this.handleFilter} defaultChecked={activeFilter === 'year'}>За год</Radio>
								<Radio name="radio" value="month" onChange={this.handleFilter} defaultChecked={activeFilter === 'month'}>За месяц</Radio>
							</div>
						</FormLayout>
						<CardGrid>
							{fethedData[activeFilter].stocks.map((stock, index) => {
								const style = {
									width: 'calc(50% - 8px)'
								};
								if (index % 2 === 0) {
									style.marginLeft = 0;
								}

								return (
									<Card size="s" mode="outline" key={stock.title} style={style}>
										<div style={{ padding: '8px', 'textAlign': 'center' }} >
											<img style={{ height: 60 }} src={`https://shop.finam.ru/${stock.imageUrl}`} alt={stock.title}/>
											<h1>{stock.title}</h1>
											<div><b style={{'fontSize': '20px'}}>{stock.price}</b> <span style={{ color: 'green'}}>{stock.percentChangeFormatted}</span> </div>
											<Button onClick={ () => this.setState({ activePanel: 'buy1', activeStock: stock }) } style={{'marginTop': '20px'}}>Купить</Button>
										</div>
									</Card>
								)
							})}
						</CardGrid>
					</Group>
				</Panel>
				<Panel id="buy1">
					<PanelHeader left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'search' })} >Назад</PanelHeaderButton>}>
						<div style={{textAlign:"center"}}>
							Покупка (1/2)
						</div>
					</PanelHeader>
					<Group style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
						<Card size="l" mode="outline">
							{activeStock && (
								<div style={{textAlign: 'center'}}>
									<img src={`https://shop.finam.ru//img/storestocks/widget/v2/${activeStock.id}.png`}/>
									<h1>{activeStock.title}</h1>
								</div>
							)}
						</Card>
						<FormLayout style={{textAlign: 'center'}}>
							<Input top="ФИО" defaultValue="Иванов Иван Иванович" />
							<Input top="Мобильный телефон" defaultValue="+7 12 344 15 48" />
							<Input top="Код подтверждения" />
							<Button onClick={ () => this.setState({ activePanel: 'buy2' }) } style={{'marginTop': '10px'}}>Далее</Button>
						</FormLayout>
					</Group>
				</Panel>
				<Panel id="buy2">
					<PanelHeader left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'buy1' })} >Назад</PanelHeaderButton>}>
						<div style={{textAlign:"center"}}>
							Покупка (1/2)
						</div>
					</PanelHeader>
					<Group style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
						<Card size="l" mode="outline">
							{activeStock && (
								<div style={{textAlign: 'center'}}>
									<img src={`https://shop.finam.ru//img/storestocks/widget/v2/${activeStock.id}.png`}/>
									<h1>{activeStock.title}</h1>
								</div>
							)}
						</Card>
						<FormLayout style={{textAlign: 'center', width: '400px'}}>
							<Slider
								min={1}
								max={30}
								step={1}
								value={Number(this.state.count)}
								onChange={value1 => this.setState({count: value1})}
								top={`Количество ${this.state.count}`}
							/>
							<Button onClick={ () => this.setState({ activePanel: 'buy2' }) } style={{'marginTop': '10px'}}>Купить</Button>
						</FormLayout>
					</Group>
				</Panel>
			</View>
		)
	}
  }


export default App;

