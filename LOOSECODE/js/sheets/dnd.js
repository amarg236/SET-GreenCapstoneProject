//Stats page
const header = ce('div', {className:'cntrd'}, [stat('Name'), stat('Class')]);
const stats = ce('div', {className:'inlne'}, [stat('Strength'),stat('Dexterity'),stat('Constitution'),stat('Intelligence'),stat('Wisdom'),stat('Charisma')]);
const wellness = ce('div', {className:'inlne'}, [stat('AC'), stat('Max HP'), stat('Current HP'), stat('Speed')])

function playerSheet(){
    //getAllPlrData()
	return ce('div', null, [header, stats, wellness]);
}
//Inventory page
function playerInventory(){
	return ce('div', null, [ce('p', null, 'items'), ce('textarea', null)]);
}
//Tabs
class Rtabs extends React.Component{
	constructor(props){
		super(props);
		this.state={value:'frontend'};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		this.setState({value:event.target.value});
		console.log('>>'+this.state.value);
		this.render();
	}
	render(){
		return ce('div', null, [
								ce('form', null, [
									ce('label', null, ['Map: ', ce('input', {type:'radio', name:'pgS', value:'frontend', onChange:this.handleChange}, null), ce('br',null, null)]),
									
									ce('label', null, ['Player Sheet: ',ce('input', {type:'radio', name:'pgS', value:'player sheet', onChange:this.handleChange}, null), ce('br',null, null)]),
									
									ce('label', null, ['Inventory: ',ce('input', {type:'radio', name:'pgS', value:'inventory', onChange:this.handleChange}, null), ce('br',null, null)]),
									
									]),
								ce('div', null, pageTabs[this.state.value])
								]);
	}
}
var pageTabs = {frontend:buildFrontend(), 'player sheet':playerSheet(), inventory:playerInventory()}
//pg = ce(Rtabs, null, null);

function tabs(){
	radios = [];
	tmp = Object.keys(pageTabs);
	for(i = 0; i < tmp.length; i++){
		radios.push(ce('label', null, tmp[i]));
		//radios.push(ce('input', {type:'radio', name:nm, key:vls[i], value:vls[i], onChange:handler}, null));
		radios.push(ce(Rtabs, {n:'page', v:tmp[i], value:tmp[i], function(){if(i==0){return }}}, null));
	}
	return radios;
}


function build(){
	//return [pg, pageTabs[pg]];
	return [tabs(), pageTabs.frontend];
}
//pageTabs[document.getElementById('selector').childNodes.forEach(function(i){if(i.checked){vld=i.value}})]