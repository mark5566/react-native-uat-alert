/**
* 备注：弹窗提示页
* create by Mark at 2019-July
*/
import React, { Component } from 'react';
import { 
		View,
		Text,
		Image,
		TouchableOpacity,
		StyleSheet,
		ViewStyle,
		Alert,
		AlertButton,
		Animated,
		Dimensions,
		Modal,
} from 'react-native';

type Props = {
		style : ViewStyle,
};
type State = {
	show : Boolean,//是否弱提示
	msg  : String,//弱提示内容
	offsetXY : Animated.ValueXY,
};


const ContainHeight : Number = 200;
const ContainWidth  : Number = 250;

const AutoHideDuration:Number = 1000;

const InitOffsetY:Number =3000;
const InitOffsetX:Number =(Dimensions.get('window').width-ContainWidth)/2;

export class UAlert extends Component<Props,State>{

	static closeTimer = null;

	static DefaultBtns :AlertButton[] = [
		{
			text:'好的',
			onPress:()=>{},
		}
	]

	state : State = {
		show : false,
		msg  : '弱提示信息',
		offsetXY:new Animated.ValueXY({x:new Animated.Value(InitOffsetX),y:new Animated.Value(InitOffsetY)}),
	}
	

	static alert(title:String,msg:String,btns:AlertButton[]){
		Alert.alert(title,msg,btns);
	}
	static DefaultAlert(msg:String){
		UAlert.alert('提示',msg,UAlert.DefaultBtns)
	}

	//
	static toast(msg:String){
		rootView.showModal(msg);
		// Toast.info(msg,1,()=>{},false);
	}

	constructor(props:Props){
		super(props);
		rootView = this;
	}



	showModal=(msg:String)=>{
		this.setState({
			show : true,
			msg  : msg,
		},()=>{
			let S_H:Number = Dimensions.get('window').height;
			let S_W:Number = Dimensions.get('window').width;
			Animated.spring(
				this.state.offsetXY,
				{
					toValue:{x:(S_W-ContainWidth)/2,y:(S_H-ContainHeight)/2},
				}
			).start(()=>{
				setTimeout(() => {
					this.hideModal();
				}, this._time);
				
			});
		})
		
	}

	hideModal = ()=>{
		// let S_H:Number = Dimensions.get('window').height;
		

		Animated.spring(
			this.state.offsetXY,
			{
				toValue:{x:InitOffsetX,y:InitOffsetY},
			}
		).start(()=>{
			this.setState({
				show:false,
				msg :'',
			})
		});
		
	}

	render(){
		const {style} = this.props;
		const {msg,show,offsetXY} = this.state;
		return (
			<Modal
				visible={show}
				transparent={true}
				>
				<Animated.View style={[style,{height:ContainHeight,top:offsetXY.y,left:offsetXY.x,},styles.container]}>
					<Text style={{color:'white'}}>{msg}</Text>
				</Animated.View>
			</Modal>
		)
	}

}

const styles = StyleSheet.create({
		container:{
			backgroundColor:'rgba(0,0,0,0.5)',
			borderRadius:10,
			alignItems:'center',
			justifyContent:'center',
			zIndex:100000000,
			width:300,
			position:'absolute',
		},
})