import React from 'react' 
import { render } from 'react-dom'
import Root from './root'
import {AppContainer} from 'react-hot-loader'
import 'antd/dist/antd.css'


render(
	<AppContainer>
		<Root></Root>
	</AppContainer>,
	document.getElementById('root')
)


if(module.hot){
	module.hot.accept('./root',()=>{
		const NewHello = require('./root').default;
		render(
			<AppContainer>
				<NewHello></NewHello>
			</AppContainer>,
			document.getElementById('root')
		)
	})
}