//This was originally for a simple DnD manager thing, going to have to change to taste but this is some basic send/set to mess with.
//I'll also post the (current non compromising) php code this hooks into, that may or may not actually work right I can't remember
//I was using this as a function reference, I'd call functions here in a sheet (I'll provide it, it's ugly as *hell*) and then build that sheet on the HTML end.

//These are broken because of URL and also all my dependancies are messed up because I kinda dropped it halfway through
//THEY DID WORK IN CONCEPT however, I was able to use them to fetch/throw data to a database. They might have broke since then idk.
host = "-snip-"
async function getAllPlrData(playerId = window.sheetData.plr, gameId = window.sheetData.GAME_ID){
    url = 'https://'+host+'/php/getAll.php';
    fd = new FormData();
    fd.append('gId', gameId);
    fd.append('pId', playerId);
    response = await fetch(url, {method: 'POST', body: fd})
    .then(function (response){
        return response.text();
    })
    .then(function (body){
        if(body != 'ERR_INVLD_DTA'){
            window.alert(body);
            req = body;
            return body;
        }
        else{
            window.alert("Error fetching player "+playerId+" from "+gameId);
            return null;
        }
    })
}
//broke see above
async function getPlrData(playerId, toSetLocal){
    url = 'https://'+host+'/php/getPlrData.php';
    fd = new FormData();
    fd.append('gId', window.sheetData.GAME_ID);
    fd.append('pId', playerId);
    fd.append('tsl', toSetLocal);
    response = await fetch(url, {method: 'POST', body: fd})
    .then(function (response) {
        return response.text();
    })
    .then(function (body) {
        if(body != 'ERR_INVLD_DTA'){
            window.sheetData[toSetLocal]=body;
        }
        else{
            window.alert("Something went wrong trying to get value for "+toSetLocal);
            return null;
        }
    });
}

//broke see above.
async function setPlrData(playerId, toSetRemote, value){
    url = 'https://'+host+'/php/setPlrData.php';
    fd = new FormData();
    fd.append('pId', playerId);
    fd.append('tsr', toSetRemote);
    fd.append('gId', window.sheetData.GAME_ID);
    fd.append('vts', value);
    response = await fetch(url, {method: 'POST', body: fd}).then(function(response){
        return response.text();
    }).then(function(body){
        
        if(body != 'ERR_INVLD_DTA'){
            return value;
        }
        else{
            window.alert("Something went wrong trying to set value for " + toSetRemote)
        }
    });
    
}
const ce = React.createElement;
window.sheetData = {};
class statForm extends React.Component{
	constructor(props){
		super(props);
		this.state=null;
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleChange(event){
		this.setState({value: event.target.value});
	}
	handleSubmit(event){
		window.alert('submission made: ' + this.state.value);
		event.preventDefault();
	}
	render(){
		return ce('form', {onSubmit:this.handleSubmit, className:'inlne statForm'},
			//[
			ce('input', {type: 'text', value:this.state.value, onChange:this.handleChange}, null)
			//,
			//ce('input', {type:'submit', value:'Submit'}, null)
			//]
		)
	}
}
function stat(label){
	return ce('div', {name:label, key:label, className: 'statDiv'}, [ce('b', null,label+':'), ce(new statForm(label), null, null)])
}
function updateStats(){
	var s = document.getElementsByClassName('statDiv');
	for(i = 0; i < s.length; i++){
		window.alert(s.item(i).firstChild.firstChild.value);
	}
}
class IDBlock extends React.Component{
    constructor(props){
        super(props);
        this.state={value:'on'};
    }
    handleChange(event){
        this.setState({value: 'on'});
    }
    handleSubmit(event){
        window.sheetData.GAME_ID=event.target.value;
    }
    render(){
        if(this.state.value === 'off'){
            return null;
        }
        return ce('form', {onSubmit: this.handleSubmit}, ce('input', {type: 'text', onChange: this.handleChange}, null));
    }
}
class Radios extends React.Component{
	constructor(props){
		super(props);
		this.state={value:''};
		//this.handleChange=this.handleChange.bind(this);
	}
	handleChange(event){
		//this.setState({v: event.target.value});
		window.PAGE=this.props.v;
		alert(this.props.v);
	}
	render(){
		return ce('input', {type:'radio', name:`${this.props.n}`, value:`${this.props.v}`, key:`${this.props.v}`, onChange:this.handleChange}, null);
	}
}
function radioBttns(nm, vls){
	radios = [];
	for(i = 0; i < vls.length; i++){
		radios.push(ce('label', null, vls[i]));
		//radios.push(ce('input', {type:'radio', name:nm, key:vls[i], value:vls[i], onChange:handler}, null));
		radios.push(ce(Radios, {n:nm, v:vls[i]}, null));
	}
	return radios;
}
/*
class panel extends React.Component{
	constructor(props){
		super(props);
		this.state={value:''};
		this.handleChange=this.handleChange.bind(this);
	}
	handleChange(event){
		this.setState({value: event.target.value});
	}
	render(){
		return ce(
	}
}
*/