import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "./@floating-ui/react-dom+[...].mjs";
//#region node_modules/react-icons/lib/iconContext.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var DefaultContext = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
};
var IconContext = import_react.createContext && /*#__PURE__*/ import_react.createContext(DefaultContext);
//#endregion
//#region node_modules/react-icons/lib/iconBase.mjs
var _excluded = [
	"attr",
	"size",
	"title"
];
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
	return tree && tree.map((node, i) => /*#__PURE__*/ import_react.createElement(node.tag, _objectSpread({ key: i }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
	return (props) => /*#__PURE__*/ import_react.createElement(IconBase, _extends({ attr: _objectSpread({}, data.attr) }, props), Tree2Element(data.child));
}
function IconBase(props) {
	var elem = (conf) => {
		var attr = props.attr, size = props.size, title = props.title, svgProps = _objectWithoutProperties(props, _excluded);
		var computedSize = size || conf.size || "1em";
		var className;
		if (conf.className) className = conf.className;
		if (props.className) className = (className ? className + " " : "") + props.className;
		return /*#__PURE__*/ import_react.createElement("svg", _extends({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, conf.attr, attr, svgProps, {
			className,
			style: _objectSpread(_objectSpread({ color: props.color || conf.color }, conf.style), props.style),
			height: computedSize,
			width: computedSize,
			xmlns: "http://www.w3.org/2000/svg"
		}), title && /*#__PURE__*/ import_react.createElement("title", null, title), props.children);
	};
	return IconContext !== void 0 ? /*#__PURE__*/ import_react.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
//#endregion
//#region node_modules/react-icons/fi/index.mjs
function FiZap(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polygon",
			"attr": { "points": "13 2 3 14 12 14 11 22 21 10 12 10 13 2" },
			"child": []
		}]
	})(props);
}
function FiUser(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" },
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "7",
				"r": "4"
			},
			"child": []
		}]
	})(props);
}
function FiTrendingUp(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "23 6 13.5 15.5 8.5 10.5 1 18" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "17 6 23 6 23 12" },
			"child": []
		}]
	})(props);
}
function FiTrendingDown(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "23 18 13.5 8.5 8.5 13.5 1 6" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "17 18 23 18 23 12" },
			"child": []
		}]
	})(props);
}
function FiTrash2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polyline",
				"attr": { "points": "3 6 5 6 21 6" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "10",
					"y1": "11",
					"x2": "10",
					"y2": "17"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "14",
					"y1": "11",
					"x2": "14",
					"y2": "17"
				},
				"child": []
			}
		]
	})(props);
}
function FiTarget(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "6"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "2"
				},
				"child": []
			}
		]
	})(props);
}
function FiSliders(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "4",
					"y1": "21",
					"x2": "4",
					"y2": "14"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "4",
					"y1": "10",
					"x2": "4",
					"y2": "3"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "21",
					"x2": "12",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "8",
					"x2": "12",
					"y2": "3"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "20",
					"y1": "21",
					"x2": "20",
					"y2": "16"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "20",
					"y1": "12",
					"x2": "20",
					"y2": "3"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "1",
					"y1": "14",
					"x2": "7",
					"y2": "14"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "9",
					"y1": "8",
					"x2": "15",
					"y2": "8"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "17",
					"y1": "16",
					"x2": "23",
					"y2": "16"
				},
				"child": []
			}
		]
	})(props);
}
function FiShield(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
			"child": []
		}]
	})(props);
}
function FiSettings(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "12",
				"r": "3"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" },
			"child": []
		}]
	})(props);
}
function FiSearch(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "11",
				"cy": "11",
				"r": "8"
			},
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "21",
				"y1": "21",
				"x2": "16.65",
				"y2": "16.65"
			},
			"child": []
		}]
	})(props);
}
function FiPlus(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "12",
				"y1": "5",
				"x2": "12",
				"y2": "19"
			},
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "5",
				"y1": "12",
				"x2": "19",
				"y2": "12"
			},
			"child": []
		}]
	})(props);
}
function FiPieChart(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21.21 15.89A10 10 0 1 1 8 2.83" },
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M22 12A10 10 0 0 0 12 2v10z" },
			"child": []
		}]
	})(props);
}
function FiMail(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "22,6 12,13 2,6" },
			"child": []
		}]
	})(props);
}
function FiLogOut(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "16 17 21 12 16 7" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "21",
					"y1": "12",
					"x2": "9",
					"y2": "12"
				},
				"child": []
			}
		]
	})(props);
}
function FiLock(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "rect",
			"attr": {
				"x": "3",
				"y": "11",
				"width": "18",
				"height": "11",
				"rx": "2",
				"ry": "2"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M7 11V7a5 5 0 0 1 10 0v4" },
			"child": []
		}]
	})(props);
}
function FiGrid(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "3",
					"width": "7",
					"height": "7"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "14",
					"y": "3",
					"width": "7",
					"height": "7"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "14",
					"y": "14",
					"width": "7",
					"height": "7"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "14",
					"width": "7",
					"height": "7"
				},
				"child": []
			}
		]
	})(props);
}
function FiFileText(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "14 2 14 8 20 8" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "13",
					"x2": "8",
					"y2": "13"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "17",
					"x2": "8",
					"y2": "17"
				},
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "10 9 9 9 8 9" },
				"child": []
			}
		]
	})(props);
}
function FiEdit2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" },
			"child": []
		}]
	})(props);
}
function FiDownload(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "7 10 12 15 17 10" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "15",
					"x2": "12",
					"y2": "3"
				},
				"child": []
			}
		]
	})(props);
}
function FiDollarSign(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "12",
				"y1": "1",
				"x2": "12",
				"y2": "23"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
			"child": []
		}]
	})(props);
}
function FiCpu(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "4",
					"y": "4",
					"width": "16",
					"height": "16",
					"rx": "2",
					"ry": "2"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "9",
					"y": "9",
					"width": "6",
					"height": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "9",
					"y1": "1",
					"x2": "9",
					"y2": "4"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "15",
					"y1": "1",
					"x2": "15",
					"y2": "4"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "9",
					"y1": "20",
					"x2": "9",
					"y2": "23"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "15",
					"y1": "20",
					"x2": "15",
					"y2": "23"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "20",
					"y1": "9",
					"x2": "23",
					"y2": "9"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "20",
					"y1": "14",
					"x2": "23",
					"y2": "14"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "1",
					"y1": "9",
					"x2": "4",
					"y2": "9"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "1",
					"y1": "14",
					"x2": "4",
					"y2": "14"
				},
				"child": []
			}
		]
	})(props);
}
function FiChevronRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "9 18 15 12 9 6" },
			"child": []
		}]
	})(props);
}
function FiChevronLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "15 18 9 12 15 6" },
			"child": []
		}]
	})(props);
}
function FiCalendar(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "4",
					"width": "18",
					"height": "18",
					"rx": "2",
					"ry": "2"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "2",
					"x2": "16",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "2",
					"x2": "8",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "10",
					"x2": "21",
					"y2": "10"
				},
				"child": []
			}
		]
	})(props);
}
function FiBell(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" },
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M13.73 21a2 2 0 0 1-3.46 0" },
			"child": []
		}]
	})(props);
}
function FiBarChart2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "18",
					"y1": "20",
					"x2": "18",
					"y2": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "20",
					"x2": "12",
					"y2": "4"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "6",
					"y1": "20",
					"x2": "6",
					"y2": "14"
				},
				"child": []
			}
		]
	})(props);
}
function FiAward(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "8",
				"r": "7"
			},
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "8.21 13.89 7 23 12 20 17 23 15.79 13.88" },
			"child": []
		}]
	})(props);
}
function FiArrowRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "5",
				"y1": "12",
				"x2": "19",
				"y2": "12"
			},
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "12 5 19 12 12 19" },
			"child": []
		}]
	})(props);
}
function FiAlertTriangle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "9",
					"x2": "12",
					"y2": "13"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "17",
					"x2": "12.01",
					"y2": "17"
				},
				"child": []
			}
		]
	})(props);
}
function FiActivity(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "22 12 18 12 15 21 9 3 6 12 2 12" },
			"child": []
		}]
	})(props);
}
//#endregion
export { FiZap as A, FiShield as C, FiTrendingDown as D, FiTrash2 as E, FiTrendingUp as O, FiSettings as S, FiTarget as T, FiLogOut as _, FiBarChart2 as a, FiPlus as b, FiChevronLeft as c, FiDollarSign as d, FiDownload as f, FiLock as g, FiGrid as h, FiAward as i, FiUser as k, FiChevronRight as l, FiFileText as m, FiAlertTriangle as n, FiBell as o, FiEdit2 as p, FiArrowRight as r, FiCalendar as s, FiActivity as t, FiCpu as u, FiMail as v, FiSliders as w, FiSearch as x, FiPieChart as y };
