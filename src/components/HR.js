import React from "react";
import { View } from "react-native";
import {getColors as AppColors} from '../styles/colors';

const HR = ({ size, color }) => (
	<View
		style={{
            borderBottomColor: color || AppColors.backgrounLogin,
            borderTopColor: color || AppColors.backgrounLogin,
            borderBottomWidth: 0.75,
            borderTopWidth: 0.75,
			margin: 10,
			width: size || "95%",
			marginTop: 10,
		}}
	/>
);

export default HR;