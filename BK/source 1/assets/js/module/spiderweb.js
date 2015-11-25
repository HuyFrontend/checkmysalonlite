// (function ($, window, Site, L10n) {
// 	var charSize = $(window).width() >= Site.tabletScreen ? '90%' : '65%';

// 	$('#emotion').find('.container-chart').each(function() {
// 		$(this).highcharts({
// 			chart: {
// 				renderTo: 'container-chart',
// 				polar: true,
// 				type: 'line',
// 				backgroundColor : '#f5f5f7'
// 			},
// 			title: {
// 				text: '',
// 				x: -80
// 			},
// 			pane: {
// 				size: charSize
// 			},
// 			xAxis: {
// 				labels: {
//             step: 1
//         },
// 				categories: L10n.spider.emotion,
// 				tickmarkPlacement: 'on',
// 				lineWidth: 0,
// 				gridLineColor:'#FFF',
// 				gridZIndex:4
// 			},
// 			yAxis: {
// 				gridLineInterpolation: 'polygon',
// 				lineWidth: 0,
// 				min: 0,
// 				max: 100,
// 				//tickPositions: [0, 10000, 20000, 40000, 80000],
// 				plotBands: [{
// 					from: 0,
// 					to: 25,
// 					color: 'rgba(180, 155, 37, 0.53)',
// 					id: 'plot-band-0'
// 				},{
// 					from: 25,
// 					to: 50,
// 					color: 'rgba(180, 155, 37, 0.4)',
// 					id: 'plot-band-1'
// 				},{
// 					from: 50,
// 					to: 75,
// 					color: 'rgba(180, 155, 37, 0.23)',
// 					id: 'plot-band-2'
// 				},{
// 					from: 75,
// 					to: 100,
// 					color: 'rgba(180, 155, 37, 0.1)',
// 					id: 'plot-band-3'
// 				}],
// 				gridLineWidth : 0,
// 				labels:{enabled: false}
// 			},
// 			plotOptions: {
// 				series: {
// 					marker: {
// 						enabled: false
// 					}
// 				},
// 				fillOpacity: 0.2,
// 				gridZIndex:10
// 			},
// 			tooltip: {
// 				shared: true,
// 				pointFormat: '<span style="color:{series.color}"><b>{point.y:,.0f}%</b></span>'
// 			},
// 			legend: {
// 				align: 'right',
// 				verticalAlign: 'top',
// 				y: 70,
// 				layout: 'vertical',
// 				enabled: false
// 			},
// 			exporting: {
// 				enabled: false
// 			},
// 			series: [{
// 				type: 'area',
// 				name: 'Actual Spending',
// 				data: [0, 0, 0, 0, 0, 0, 0],
// 				pointPlacement: 'on',
// 				zIndex : 0,
// 				color: 'rgba(180, 155, 37, 1)'
// 			}]
// 		});
// 	});

// 	$('#mysalon').find('.container-chart').each(function() {
// 		$(this).highcharts({
// 			chart: {
// 				renderTo: 'container-chart',
// 				polar: true,
// 				type: 'line',
// 				backgroundColor : '#f5f5f7'
// 			},
// 			title: {
// 				text: '',
// 				x: -80
// 			},
// 			pane: {
// 				size: charSize
// 			},
// 			xAxis: {
// 				labels: {
//             step: 1
//         },
// 				categories: L10n.spider.mysalon,
// 				tickmarkPlacement: 'on',
// 				lineWidth: 0,
// 				gridLineColor:'#FFF',
// 				gridZIndex:4
// 			},
// 			yAxis: {
// 				gridLineInterpolation: 'polygon',
// 				lineWidth: 0,
// 				min: 0,
// 				max: 100,
// 				//tickPositions: [0, 10000, 20000, 40000, 80000],
// 				plotBands: [{
// 					from: 0,
// 					to: 25,
// 					color: 'rgba(180, 155, 37, 0.53)',
// 					id: 'plot-band-0'
// 				},{
// 					from: 25,
// 					to: 50,
// 					color: 'rgba(180, 155, 37, 0.4)',
// 					id: 'plot-band-1'
// 				},{
// 					from: 50,
// 					to: 75,
// 					color: 'rgba(180, 155, 37, 0.23)',
// 					id: 'plot-band-2'
// 				},{
// 					from: 75,
// 					to: 100,
// 					color: 'rgba(180, 155, 37, 0.1)',
// 					id: 'plot-band-3'
// 				}],
// 				gridLineWidth : 0,
// 				labels:{enabled: false}
// 			},
// 			plotOptions: {
// 				series: {
// 					marker: {
// 						enabled: false
// 					}
// 				},
// 				fillOpacity: 0.2,
// 				gridZIndex:10
// 			},
// 			tooltip: {
// 				shared: true,
// 				pointFormat: '<span style="color:{series.color}"><b>{point.y:,.0f}%</b></span>'
// 			},
// 			legend: {
// 				align: 'right',
// 				verticalAlign: 'top',
// 				y: 70,
// 				layout: 'vertical',
// 				enabled: false
// 			},
// 			exporting: {
// 				enabled: false
// 			},
// 			series: [{
// 				type: 'area',
// 				name: 'Actual Spending',
// 				data: [0, 0, 0, 0, 0, 0],
// 				pointPlacement: 'on',
// 				zIndex : 0,
// 				color: 'rgba(180, 155, 37, 1)'
// 			}]
// 		});
// 	});
// }(window.jQuery, window, window.Site, window.L10n));
