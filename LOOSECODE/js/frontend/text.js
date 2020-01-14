class Playfield extends React.Component{
	constructor(props){
		super(props);
		this.state={value:''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange=this.handleChange.bind(this);
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
			[
			ce('textarea', { value:this.state.value, onChange:this.handleChange}, null),
			ce('input', {type:'submit', value:'Submit'}, null)
			]);
	}
}
function buildFrontend(){
	return ce(Playfield, null, null);
}