<template>
	<view>
		<xls-jy-navbar title="修改充值套餐"></xls-jy-navbar>
		<!-- 场地信息 -->
		<view class="address-container" v-if="params.id">
			<p>
				<span class="name">{{placeInfo.placeName ? placeInfo.placeName : ''}}</span>
				<!-- <spanclass="total-equipments">{{ placeDeviceNum }}台</span> -->
			</p>
			<p class="address box-sizing">
				{{placeInfo ? placeInfo.city + placeInfo.placeDetails : ''}}
			</p>
		</view>
		<!-- 批量设置 -->
		<view class="address-container" v-else>
			<p>
				<span class="name">{{`已选择${params.total}个场地`}}</span>
				<!-- <span class="total-equipments">{{ placeDeviceNum }}台</span> -->
			</p>
		</view>
		<!-- 1: 娃娃机；2：扭蛋机；3：游乐车；4：售货机；5：兑币机； -->
		<view class="type-con" v-show="placeDeviceTypeList.length">
			<view class="type-con_ul">
				<view class="item" v-for="(dev, index) in placeDeviceTypeList" :key="index"
					:style="{color:activeDeviceTypeId == dev.deviceTypeId?'#5241FF':''}"
					@click="pickerDiffType(dev.deviceTypeId)">
					<image mode="heightFix" :src="getImage(dev.deviceTypeId)" alt="" class="type-img" />
					<p class="item-text" v-html="dev.deviceTypeName"></p>
					<p class="num-color" :class="{'active':activeDeviceTypeId == dev.deviceTypeId}">
						{{ `${dev.deviceNum}台` }}
					</p>
				</view>
			</view>
		</view>
		<!-- 场地无设备 -->
		<view class="null" v-show="placeDeviceNum == 0">
			<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/null.png`" alt="" />
			<p class="font-size_30">该场地暂无设备</p>
			<p class="font-size_30">请扫描设备二维码注册</p>
			<view class="mint-button" @click="goTo('deviceBind')">
				立即注册设备
			</view>
		</view>
		<!-- 售货机 -->
		<view class="shjMeal gashapon" v-show="activeDeviceTypeId == 4">
			<!-- 20230626  -->
			<!-- 充值入口 -->
			<view class="recharge-management" v-hasPermi="['app:meal:index:ylcset']">
				<view class="recharge-entry">
					<span class="text" @click="(gashaponNotice = !gashaponNotice), (noticeNum = 0)">充值入口
						<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" />
					</span>
					<view class="switch-box">
						<view class="switch">
							<u-switch v-model="gasArguments.rechargeEntrance" @change="setEggMsg" active-color="#5241FF"
								size="50" />
						</view>
						<span v-html="gasArguments.rechargeEntrance ? '开' : '关'"></span>
					</view>
				</view>
				<view class="recharge-entry children">
					<span class="text" @click="(gashaponNotice = !gashaponNotice), (noticeNum = 1)">先充值后消费
						<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" />
					</span>
					<view class="switch-box">
						<view class="switch">
							<u-switch v-model="gasArguments.rechargeConsume" @change="setEggMsg" active-color="#5241FF"
								size="50" />
						</view>
						<span v-html="gasArguments.rechargeConsume ? '开' : '关'"></span>
					</view>
				</view>
			</view>

			<!-- 充值套餐 -->
			<view class="batchSetting home-family">
				<view class="content-header box-sizing">
					<p class="name">充值套餐</p>
					<view class="right Center">
						<span @click="defaultMealSet(4)" v-hasPermi="['app:meal:index:reset']">恢复默认设置</span>
						<view class="line Center"></view>
						<span @click="openMealYlc('addMeal')" v-hasPermi="['app:meal:index:add']">添加</span>
					</view>
				</view>

				<view class="list-container">
					<view class="item box-sizing" v-for="(meal, index) in ylcMeal" :key="index"
						:style="{border:index==ylcMeal.length-1?'none':''}">
						<span>{{ meal.price }}元送{{ meal.give }}元</span>
						<view class="handle-list">
							<span class="handle-btn upgrade" @click="openMealYlc(meal)"
								v-hasPermi="['app:meal:index:edit']">编辑</span>
							<span class="handle-btn" @click="deleteYlc(meal.id)"
								v-hasPermi="['app:meal:index:delete']">删除</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 兑币机 核销开关 -->
		<view class="gashapon" v-if="activeDeviceTypeId == 5">
			<view class="recharge-management">
				<view class="recharge-entry childrenDBJ">
					<!-- <span class="text" @click="(gashaponNotice = !gashaponNotice), (noticeNum = 0)"> -->
					<span class="text">
						抖音核销
						<!-- <image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" /> -->
					</span>
					<view class="switch-box">
						<view class="switch">
							<u-switch v-model="gasArguments.dyWriteOff" @change="setEggMsg"
								active-color="#5241FF" size="50" />
						</view>
						<span>{{gasArguments.dyWriteOff ? '开' : '关'}}</span>
					</view>
				</view>
				
				<view class="recharge-entry childrenDBJ">
					<!-- <span class="text" @click="(gashaponNotice = !gashaponNotice), (noticeNum = 0)"> -->
					<span class="text">
						美团核销
						<!-- <image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" /> -->
					</span>
					<view class="switch-box">
						<view class="switch">
							<u-switch v-model="gasArguments.meituanWriteOff" @change="setEggMsg"
								active-color="#5241FF" size="50" />
						</view>
						<span>{{gasArguments.meituanWriteOff ? '开' : '关'}}</span>
					</view>
				</view>
			</view>
		</view>
		<!-- 兑币机 -->
		<view class="mealSettting home-family" v-show="activeDeviceTypeId == 5">
			<view>
				<view class="content-header">
					<view class="title">
						兑币套餐设置<span class="txt">(支付后直接出币)</span>
					</view>
				</view>
				<view class="tab-header-box">
					<span class="discount">套餐</span>
					<span class="status Center">套餐类型 | 套餐状态
						<u-icon name="question-circle" color="#5241FF" size="34" @click="$refs.coinNotice.showNotice()"
							style="margin-left: 16rpx" /></span>
					<span class="operate">操作</span>
				</view>
				<view class="list-item">
					<view class="list-content" v-for="(meal, index) in converCoin" :key="index"
						:style="{border:index==converCoin.length-1?'none':''}">
						<view class="currencyQuantity-pay">
							{{ meal.price }}元={{ meal.currencyQuantity }}币
						</view>
						<view class="status-txt">
							<!-- setMealType 套餐类型;（1：标准，2：自定义）-->
							<span class="type-text" v-show="meal.setMealType == 1">标准</span>
							<span class="type-text custom" v-show="meal.setMealType == 2">自定义</span>
							<!-- setMealState 套餐状态;（1：启用，2：停用） -->
							<span class="type-text" v-show="meal.setMealState == 1">已启用</span>
							<span class="type-text disable-txt" v-show="meal.setMealState == 2">禁用</span>
							<span class="type-text custom" v-show="meal.setMealState == 0">活动专属</span>
						</view>
						<view class="opera-btns">
							<span class="opera-btn" @click="editOrAddMeal(meal)"
								v-hasPermi="['app:meal:index:edit']">改套餐</span>
							<span class="edit-status-btn opera-btn" @click="editMealState(meal)"
								v-hasPermi="['app:meal:index:edit']">改状态</span>
						</view>
					</view>
					<!-- add -->
					<view class="add-btn" @click="editOrAddMeal('add', 'dbj')">
						<u-icon name="plus-circle" color="#5241FF" size="48" v-hasPermi="['app:meal:index:add']" />
						<span style="margin-left: 6px" v-hasPermi="['app:meal:index:add']">添加自定义套餐</span>
					</view>
				</view>
			</view>
			<view style="height: 10px; background: #f5f6f7"></view>
			<view>
				<view class="content-header">
					<view class="title">
						储值币套餐设置<span class="txt">(支付后得电子游戏币，用户需手动取币)</span>
					</view>
				</view>
				<view class="tab-header-box">
					<span class="discount">套餐</span>
					<span class="status Center">套餐类型 | 套餐状态
						<u-icon name="question-circle" color="#5241FF" size="34" @click="$refs.coinNotice.showNotice()"
							style="margin-left: 8px" /></span>
					<span class="operate">操作</span>
				</view>
				<coinNotice ref="coinNotice"></coinNotice>
				<coinState ref="coinState" @deleteMealItem="deleteMealItem" @getConverList="getConverList"
					@getComboMealList="getComboMealList"></coinState>
				<view class="list-item">
					<view class="list-content" v-for="(meal, index) in basicMeal" :key="index"
						:style="{border:index==basicMeal.length-1?'none':''}">
						<view class="currencyQuantity-pay">
							{{ meal.price }}元={{ meal.currencyQuantity }}币
						</view>
						<view class="status-txt">
							<!-- setMealType 套餐类型;（1：标准，2：自定义） -->
							<span class="type-text" v-show="meal.setMealType == 1">标准</span>
							<span class="type-text custom" v-show="meal.setMealType == 2">自定义</span>
							<!-- setMealState 套餐状态;（1：启用，2：停用）-->
							<span class="type-text" v-show="meal.setMealState == 1">已启用</span>
							<span class="type-text disable-txt" v-show="meal.setMealState == 2">禁用</span>
							<span class="type-text custom" v-show="meal.setMealState == 0">活动专属</span>
						</view>
						<view class="opera-btns">
							<span class="opera-btn" @click="editOrAddMeal(meal)"
								v-hasPermi="['app:meal:index:edit']">改套餐</span>
							<span class="edit-status-btn opera-btn" @click="editMealState(meal)"
								v-hasPermi="['app:meal:index:edit']">改状态</span>
						</view>
					</view>
					<!-- add -->
					<view class="add-btn" @click="editOrAddMeal('add')">
						<u-icon name="plus-circle" color="#5241FF" size="48" v-hasPermi="['app:meal:index:add']" />
						<span style="margin-left: 6px" v-hasPermi="['app:meal:index:add']">添加自定义套餐</span>
					</view>
				</view>
			</view>
			<!-- bottom -->
			<view class="redmine-tips home-family">
				<p>储值套餐开启须知</p>
				<view>
					<span>1、&nbsp;&nbsp;</span><span>开启以上储值套餐，玩家购买所得的游戏币将储存于其本商户的会员账户内，即等于存币。用户需手动取出游戏币。</span>
				</view>
				<view>
					<span>2、&nbsp;&nbsp;</span><span>开启后系统默认兑币机储值币与娃娃机线上游戏币通用&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;对此可能出现兑币机出表数与入表数不平的情况。&nbsp;</span>
				</view>
			</view>
			<view class="add-btn" @click="defaultMealSet" v-hasPermi="['app:meal:index:reset']">
				<u-icon name="reload" color="#5241FF" size="48" />
				<span style="margin-left: 6px">恢复默认设置</span>
			</view>
		</view>
		
		<!-- 扭蛋机-娃娃机-儿童类-游戏类-微抓机 -->
		<view class="gashapon" v-show="[1, 2, 6, 7, 8].includes(activeDeviceTypeId)">
			<view v-show="[2, 6, 7, 8].includes(activeDeviceTypeId)" v-hasPermi="['app:meal:index:ndjset']">
				<view class="recharge-management">
					<view class="recharge-entry">
						<span class="text" @click="(gashaponNotice = !gashaponNotice), (noticeNum = 0)">充值入口
							<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" />
						</span>
						<view class="switch-box">
							<view class="switch">
								<u-switch v-model="gasArguments.rechargeEntrance" @change="setEggMsg"
									active-color="#5241FF" size="50" />
							</view>
							<span>{{gasArguments.rechargeEntrance ? '开' : '关'}}</span>
						</view>
					</view>
					<view class="recharge-entry children">
						<span class="text" @click="(gashaponNotice = !gashaponNotice), (noticeNum = 1)">先充值后消费
							<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" />
						</span>
						<view class="switch-box">
							<view class="switch">
								<u-switch v-model="gasArguments.rechargeConsume" @change="setEggMsg"
									active-color="#5241FF" size="50" />
							</view>
							<span>{{gasArguments.rechargeConsume ? '开' : '关'}}</span>
						</view>
					</view>
					<view class="recharge-entry children">
						<span class="text" @click="
							(gashaponNoticeEnd = !gashaponNoticeEnd), (noticeNumTwo = 0)
						  ">充值引导绑定手机
							<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" />
						</span>
						<view class="switch-box">
							<view class="switch">
								<u-switch v-model="gasArguments.guideBindingPhone" @change="setEggMsg"
									active-color="#5241FF" size="50" />
							</view>
							<span>{{gasArguments.guideBindingPhone ? '开' : '关'}}</span>
						</view>
					</view>
					<view class="recharge-entry children">
						<span class="text" @click="
							(gashaponNoticeEnd = !gashaponNoticeEnd), (noticeNumTwo = 1)
						  ">充值强制绑定手机
							<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" />
						</span>
						<view class="switch-box">
							<view class="switch">
								<u-switch v-model="gasArguments.constraintBindingPhone" @change="setEggMsg"
									active-color="#5241FF" size="50" />
							</view>
							<span>{{gasArguments.constraintBindingPhone ? '开' : '关'}}</span>
						</view>
					</view>
				</view>
				<!-- 自动退款 -->
				<view class="refund bg home-family">
					<view class="list-name">
						自动退款
						<p class="tip">启动失败系统自动退款</p>
					</view>
					<view class="switch-box">
						<view class="switch">
							<u-switch v-model="gasArguments.automaticRefund" @change="setEggMsg" active-color="#5241FF"
								size="50" />
						</view>
						<span v-html="gasArguments.automaticRefund ? '开' : '关'"></span>
					</view>
				</view>
				<!-- 库存限制 -->
				<view class="refund bg home-family">
					<view class="list-name">
						库存&lt;购买数量时限制交易
						<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" @click="noticeEnd"
							class="image" />
					</view>
					<view class="switch-box">
						<view class="switch">
							<u-switch v-model="gasArguments.understockAstrict" @change="setEggMsg"
								active-color="#5241FF" size="50" />
						</view>
						<span v-html="gasArguments.understockAstrict ? '开' : '关'"></span>
					</view>
				</view>
				<!-- 投币类型 -->
				<view class="refund bg home-family" @click="
					(gashaponMachine = !gashaponMachine),
					  (middleValue = gasArguments.insertCoinsType)
				  ">
					<view class="list-name">线下投币类型</view>
					<view class="switch-box offline">
						<view class="switch">{{gasArguments.insertCoinsType?'线下投游戏币':'线下投硬币'}}</view>
						<!-- 线下投币类型;(1.线下投游戏币，2.线下投硬币) -->
						<u-icon name="arrow-right" size="32" color="#4c4c4c" />
					</view>
				</view>
			</view>
			
			
			<!-- 套餐 -->
			<view class="batchSetting home-family">
				<view class="content-header box-sizing" v-if="params.id">
					<p class="name">充值优惠</p>
					<view class="right Center">
						<span @click="defaultMealSet()" v-hasPermi="['app:meal:index:reset']">恢复默认设置</span>
						<view class="line Center" v-hasPermi="['app:meal:index:add']"></view>
						<span @click="editOrAddMeal('add')" v-hasPermi="['app:meal:index:add']">添加</span>
					</view>
				</view>
				<view class="content-header box-sizing" v-else>
					<p class="name">批量充值优惠</p>
					<view class="right Center">
						<span @click="clearMeal">一键清空</span>
						<span style="margin: 0 6px; color: #999" v-hasPermi="['app:meal:index:add']">|</span>
						<span @click="editOrAddMeal('all')" v-hasPermi="['app:meal:index:add']">添加</span>
					</view>
				</view>
				<!-- 扭蛋机套餐单个与批量 -->
				<view class="list-container" v-if="params.id">
					<view class="item box-sizing" v-for="(meal, index) in basicMeal" :key="index"
						:style="{border:index==basicMeal.length-1?'none':''}">
						<span>{{ meal.price }}元={{ meal.currencyQuantity }}币</span>
						<view class="handle-list">
							<u-icon name="arrow-upward" class="close-right" color="rgba(65,65,65,.6)" size="44"
								:class="{'disableShit':index == 0}" @click="shiftUp(meal, basicMeal[index - 1].weight)"
								v-hasPermi="['app:meal:index:edit']" />
							<u-icon name="arrow-upward" class="grade" color="rgba(65,65,65,.6)" size="44"
								:class="{'disableShit':index == basicMeal.length - 1}"
								@click="shiftDown(meal, basicMeal[index + 1].weight)"
								v-hasPermi="['app:meal:index:edit']" />
							<span class="handle-btn upgrade" @click="editOrAddMeal(meal)"
								v-hasPermi="['app:meal:index:edit']">编辑</span>
							<span class="handle-btn" @click="deleteMealItem(meal.id)"
								v-hasPermi="['app:meal:index:delete']">删除</span>
						</view>
					</view>
				</view>
				<view class="list-container" v-else>
					<view class="item box-sizing" v-for="(meal, index) in basicMealAll" :key="index"
						:style="{border:index==basicMeal.length-1?'none':''}">
						<span>{{ meal.price }}元={{ meal.currencyQuantity }}币</span>
						<view class="handle-list">
							<u-icon name="upgrade" class="close-right" color="rgba(65,65,65,.6)" size="22"
								:class="{'disableShit':index == 0}" @click="swapArr(index, index - 1)" />
							<u-icon name="upgrade" class="grade" color="rgba(65,65,65,.6)" size="22"
								:class="{'disableShit':index == basicMealAll.length-1}"
								@click="swapArr(index, index + 1)" />
							<span class="handle-btn" @click="deleteAllMeal(index)">删除</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 游乐车 -->
		<view class="gashapon" v-show="activeDeviceTypeId == 3">
			<!-- 充值入口 -->
			<view class="recharge-management" v-hasPermi="['app:meal:index:ylcset']">
				<view class="recharge-entry">
					<span class="text" @click="(gashaponNotice = !gashaponNotice), (noticeNum = 0)">充值入口
						<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" />
					</span>
					<view class="switch-box">
						<view class="switch">
							<u-switch v-model="gasArguments.rechargeEntrance" @change="setEggMsg" active-color="#5241FF"
								size="50" />
						</view>
						<span v-html="gasArguments.rechargeEntrance ? '开' : '关'"></span>
					</view>
				</view>
				<view class="recharge-entry children">
					<span class="text" @click="(gashaponNotice = !gashaponNotice), (noticeNum = 1)">先充值后消费
						<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/tips.png`" alt="" class="image" />
					</span>
					<view class="switch-box">
						<view class="switch">
							<u-switch v-model="gasArguments.rechargeConsume" @change="setEggMsg" active-color="#5241FF"
								size="50" />
						</view>
						<span v-html="gasArguments.rechargeConsume ? '开' : '关'"></span>
					</view>
				</view>
			</view>
			<!-- 投币类型 -->
			<view class="refund bg home-family"
				@click="(gashaponMachine = !gashaponMachine),(middleValue = gasArguments.insertCoinsType)"
				v-hasPermi="['app:meal:index:ylcset']">
				<view class="list-name">线下启动类型</view>
				<view class="switch-box offline">
					<view class="switch" v-html="gasArguments.insertCoinsType ? '启动次数' : '现金收益'"></view>
					<!-- 线下投币类型;(1.启动次数，2.现金收益) -->
					<u-icon name="arrow-right" size="32" color="#4c4c4c" />
				</view>
			</view>
			<!-- 充值套餐 -->
			<view class="batchSetting home-family">
				<view class="content-header box-sizing">
					<p class="name">充值套餐</p>
					<view class="right Center">
						<span @click="defaultMealSet(4)" v-hasPermi="['app:meal:index:reset']">恢复默认设置</span>
						<view class="line Center"></view>
						<span @click="openMealYlc('addMeal')" v-hasPermi="['app:meal:index:add']">添加</span>
					</view>
				</view>
				<view class="list-container">
					<view class="item box-sizing" v-for="(meal, index) in ylcMeal" :key="index"
						:style="{border:index==ylcMeal.length-1?'none':''}">
						<span>{{ meal.price }}元送{{ meal.give }}元</span>
						<view class="handle-list">
							<span class="handle-btn upgrade" @click="openMealYlc(meal)"
								v-hasPermi="['app:meal:index:edit']">编辑</span>
							<span class="handle-btn" @click="deleteYlc(meal.id)"
								v-hasPermi="['app:meal:index:delete']">删除</span>
						</view>
					</view>
				</view>
			</view>
			<!-- 服务套餐 -->
			<view class="batchSetting">
				<view class="content-header box-sizing" v-if="params.id">
					<p class="name">服务套餐</p>
					<view class="right Center">
						<span @click="defaultMealSet(3)" v-hasPermi="['app:meal:index:reset']">恢复默认设置</span>
						<view class="line Center"></view>
						<span @click="openYlc('add')" v-hasPermi="['app:meal:index:add']">添加</span>
					</view>
				</view>
				<view class="content-header box-sizing" v-else>
					<p class="name">批量服务套餐</p>
					<view class="right Center">
						<span>一键清空</span>
						<span style="margin: 0 6px; color: #999" v-hasPermi="['app:meal:index:add']">|</span>
						<span @click="openYlc('all')" v-hasPermi="['app:meal:index:add']">添加</span>
					</view>
				</view>
				<!-- 套餐单个与批量 -->
				<view class="list-container" v-if="params.id">
					<view class="item box-sizing" v-for="(meal, index) in basicMeal" :key="index"
						:style="{border:index==basicMeal.length-1?'none':''}">
						<span>{{ meal.price }}元/{{ meal.gameTime }}分钟/{{
                meal.currencyQuantity
              }}币</span>
						<view class="handle-list">
							<span class="handle-btn upgrade" @click="openYlc(meal)"
								v-hasPermi="['app:meal:index:edit']">编辑</span>
							<span class="handle-btn" @click="deleteMealItem(meal.id)"
								v-hasPermi="['app:meal:index:delete']">删除</span>
						</view>
					</view>
				</view>
				<view class="list-container" v-else>
					<view class="item box-sizing" v-for="(meal, index) in basicMealAll" :key="index"
						:style="{border:index==basicMeal.length-1?'none':''}">
						<span>{{ meal.price }}元/{{ meal.gameTime }}分钟/{{
                meal.currencyQuantity
              }}币</span>
						<view class="handle-list">
							<span class="handle-btn" @click="deleteAllMeal(index)">删除</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 游乐车 充值套餐-->
		<edit-popup ref="ylcMealPopup" :confirmOper="confirmOper">
			<view class="edit-info">
				<view class="input-row" style="margin: 0">
					<span><span style="color: red">*</span>&nbsp;价格</span>
					<view class="input-wrap">
						<view>
							<input v-model="mealInfo.price" clearable placeholder="输入价格" input-align="center"
								type="number"></input>
						</view>
						<span class="num">元</span>
					</view>
				</view>
				<view class="input-row">
					<span><span style="color: red">*</span>&nbsp;赠送</span>
					<view class="input-wrap">
						<view>
							<input v-model="mealInfo.give" clearable placeholder="输入赠送金额" input-align="center"
								type="number"></input>
						</view>
						<span class="num">元</span>
					</view>
				</view>
			</view>
		</edit-popup>
		<!--  游乐车 时间套餐 -->
		<edit-popup ref="ylc" :confirmOper="confirmOper">
			<view class="edit-info">
				<view class="input-row">
					<span><span style="color: red">*</span>&nbsp;价格</span>
					<view class="input-wrap">
						<view>
							<input v-model="mealInfo.price" clearable placeholder="输入价格" input-align="center"
								type="number"></input>
						</view>
						<span class="num">元</span>
					</view>
				</view>
				<view class="input-row">
					<span><span style="color: red">*</span>&nbsp;模拟投币数</span>
					<view class="input-wrap">
						<view>
							<input v-model="mealInfo.currencyQuantity" clearable placeholder="输入投币数"
								input-align="center" type="digit"></input>
						</view>
						<span class="num">个</span>
					</view>
				</view>
				<view class="input-row">
					<span>&nbsp;时长</span>
					<view class="input-wrap">
						<view>
							<input v-model="mealInfo.gameTime" clearable placeholder="输入套餐时长" input-align="center"
								type="digit"></input>
						</view>
						<span class="num">分钟</span>
					</view>
				</view>

				<p class="diy-dbj-info">(设备启动后，将运行“模拟投币数”对应的模式)</p>
			</view>
		</edit-popup>
		<!-- 娃娃机+兑币机+扭蛋机 -->
		<edit-popup ref="editOrAdd" :confirmOper="confirmOper">
			<view class="edit-info">
				<view class="input-row" style="margin: 0">
					<span><span style="color: red">*</span>&nbsp;价格</span>
					<view class="input-wrap" :class="{'disabled':disAbleSetprice}">
						<view>
							<input v-model="mealInfo.price" clearable placeholder="输入套餐金额" input-align="center"
								type="text"></input>
						</view>
						<span class="num">元</span>
					</view>
				</view>
				<view class="input-row">
					<span><span style="color: red">*</span>&nbsp;兑币数量</span>
					<view class="input-wrap stepper">
						<view class="btn sub Center" @click="mealInfo.currencyQuantity--"
							:class="{'disableShit':mealInfo.currencyQuantity == 0}">
							<u-icon name="minus" color="#333" size="32" />
						</view>
						<view class="field">
							<input v-model="mealInfo.currencyQuantity" clearable placeholder="输入币数" input-align="center"
								type="digit"></input>
						</view>
						<view class="btn add Center" @click="mealInfo.currencyQuantity++">
							<u-icon name="plus" color="#333" size="32" />
						</view>
					</view>
				</view>
				<p class="diy-dbj-info" v-show="activeDeviceTypeId == 5">
					备注:建议总套餐数量控制在9个以内。
				</p>
			</view>
		</edit-popup>
		<!-- 售货机 -->
		<edit-popup ref="shj" :confirmOper="confirmOper">
			<view class="edit-info">
				<view class="input-row">
					<span><span style="color: red">*</span>&nbsp;价格</span>
					<view class="input-wrap">
						<view>
							<input v-model="mealInfo.price" clearable placeholder="输入套餐金额" input-align="center"
								type="number"></input>
						</view>
						<span class="num">元</span>
					</view>
				</view>
				<view class="input-row">
					<span><span style="color: red">*</span>&nbsp;时长</span>
					<view class="input-wrap">
						<view>
							<input v-model="mealInfo.gameTime" clearable placeholder="输入套餐时长" input-align="center"
								type="number"></input>
						</view>
						<span class="num">分钟</span>
					</view>
				</view>
				<view class="input-row tips">
					(设备启动后，将运行“模拟投币数”对应的模式)
				</view>
			</view>
		</edit-popup>
		<!-- 扭蛋机、游乐车 + 线下投币类型、线下启动类型 -->
		<u-popup :show="gashaponMachine" mode="bottom">
			<view class="gashapon-machine">
				<view class="title-box box-sizing">
					<view class="btn cancel" @click="
              (gashaponMachine = !gashaponMachine),
                (gasArguments.insertCoinsType = middleValue)
            ">
						取消
					</view>
					<view class="btn confirm" @click="setEggMsg">保存</view>
				</view>
				<view class="desc" v-show="activeDeviceTypeId != 3">
					线下投币类型保存成功，立即生效！
				</view>
				<view class="radio-item" @click="gasArguments.insertCoinsType = !gasArguments.insertCoinsType">
					<view class="left-icon">
						<u-icon name="checkmark-circle" color="#dcdcdc" size="44"
							v-show="!gasArguments.insertCoinsType" />
						<u-icon name="checkmark-circle-fill" color="#5241FF" size="44"
							v-show="gasArguments.insertCoinsType" />
					</view>
					<view class="right-text">
						<view class="radio-title">
							{{
                activeDeviceTypeId != 3
                  ? "线下投游戏币"
                  : "启动次数"
              }}
						</view>
						<view class="radio-sub-title">
							{{
                activeDeviceTypeId != 3
                  ? "顾客在该场地扭蛋机设备进行线下投币时后台统计为线下投币"
                  : "顾客在该场地游乐车设备进行线下刷卡启动时，后台统计为下线投币记录，不统计为现金收益"
              }}
						</view>
					</view>
				</view>
				<view class="radio-item" @click="gasArguments.insertCoinsType = !gasArguments.insertCoinsType">
					<view class="left-icon">
						<u-icon name="checkmark-circle" color="#dcdcdc" size="44"
							v-show="gasArguments.insertCoinsType" />
						<u-icon name="checkmark-circle-fill" color="#5241FF" size="44"
							v-show="!gasArguments.insertCoinsType" />
					</view>
					<view class="right-text">
						<view class="radio-title">
							{{
                activeDeviceTypeId != 3
                  ? "线下投一元硬币"
                  : "现金收益"
              }}
						</view>
						<view class="radio-sub-title">
							{{
                activeDeviceTypeId != 3
                  ? "顾客在该场地扭蛋机设备进行线下投币时后台统计为现金收益"
                  : "顾客在该场地游乐车设备进行线下刷卡启动时，后台统计为现金收益，现金收益等于线下启动次数X启动金额（只取设置的第一个套餐）"
              }}
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 说明 -->
		<u-popup :show="gashaponNotice" round="20" mode="center">
			<view class="gashaponNotice home-family">
				<view v-show="noticeNum == 0">
					<view>
						<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/balance-notice.png`" alt=""
							class="img-one" />
					</view>
					<view class="introduce">
						<span class="weight">充值入口开关：</span>
						选择开启时，用户界面会在用户功能栏显示【充值】或者【充值优惠】的按钮，引导用户进行充值；选择关闭时，则将界面的充值入口隐藏，用户无法再次充值，但原先的余币/余额仍然可以继续使用。
					</view>
				</view>
				<view v-show="noticeNum == 1">
					<view>
						<image mode="widthFix" :src="`${$baseUrl}appV4/setImage/sufficient.png`" alt=""
							class="img-two" />
					</view>
					<view class="introduce">
						<span class="weight">先充值后消费：</span>
						开启时，会强制开启【充值入口】，在用户选择服务套餐进行消费时，会先判断用户的余币/余额是否满足抵扣，如果余额充足时，将会直接抵扣；如果余币/余额不足时，会引导用户先充值后消费。
					</view>
				</view>
				<view class="btn-confirm box-sizing">
					<span class="close" @click="gashaponNotice = !gashaponNotice">了解</span>
				</view>
			</view>
		</u-popup>
		<!-- 说明 -->
		<u-popup :show="gashaponNoticeEnd" round="20" mode="center">
			<view class="gashaponNoticeEnd">
				<view v-show="noticeNumTwo == 0">
					<view class="title">
						<span>充值引导绑定手机</span><span class="ic-close"
							@click="gashaponNoticeEnd = !gashaponNoticeEnd">X</span>
					</view>
					<view class="introduce position">
						<span>开启功能后，若顾客未绑定手机且有余额，则每次扫码进入首页时，会弹出提示框，引导客户绑定手机号</span>
					</view>
				</view>
				<view v-show="noticeNumTwo == 1">
					<view class="title">
						<span>充值强制绑定手机</span><span class="ic-close"
							@click="gashaponNoticeEnd = !gashaponNoticeEnd">X</span>
					</view>
					<view class="introduce position">
						<span>开启功能后：
							<view>
								1.若用户有余额(币)且未绑定手机，每次扫码进入首页时，点击套餐及充值，都会弹出该框，不绑定手机无法继续使用。
							</view>
							<view>
								2.若用户没有余额(币)且没有绑定手机号，可以点击套餐进行消费。但点击充值时，会先弹出绑定手机弹框。不绑定无法充值。
							</view>
						</span>
					</view>
				</view>
				<view class="btn-confirm box-sizing">
					<span class="close" @click="gashaponNoticeEnd = !gashaponNoticeEnd">确定</span>
				</view>
			</view>
		</u-popup>
		<!-- 其他设备 --游乐车-->
		<u-popup :show="otherDevice" mode="bottom">
			<view class="otherDevice home-family">
				<view class="popup-title">选择设备类型</view>
				<view class="universal-list">
					<view class="item" :style="{color:activeDeviceTypeId==3?'#5241FF':''}">
						<view @click="activeDevice(1)">
							<view class="iconfont"><u-icon name="question-circle" size="24" /></view>
							<view class="name">游乐车</view>
							<view class="number">m台</view>
						</view>
					</view>
				</view>
				<view class="popup-title close-btn" @click="otherDevice = !otherDevice">
					关闭
				</view>
			</view>
		</u-popup>
		<!-- 下一步--批量设置 -->
		<view class="wrapper" v-show="0">
			<view class="step-wrapper box-sizing">
				<view class="btn" @click="goTo('nextStep')">
					下一步
				</view>
			</view>
		</view>
		<view class="wrapper" v-show="basicMealAll.length">
			<view class="step-wrapper box-sizing">
				<view class="btn" @click="allSetMeal">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		packageController,
		placeController,
		deviceController
	} from '@/api/index.js';
	import EditPopup from "./components/editPopup";
	import CoinNotice from "./components/coinNotice";
	import CoinState from "./components/coinState";
	import {
		debounceFun,
		throttleFun
	} from "@/plugins/debounceOrthrottle";
	export default {
		components: {
			EditPopup,
			CoinNotice,
			CoinState
		},
		data() {
			return {
				// 场地设备数量
				placeDeviceNum: 0,
				//场地-设备
				placeInfo: [],
				placeDeviceTypeList: [],
				//设备类型（1娃娃机，2扭蛋机，5兑币机）
				activeDeviceTypeId: 0,
				//储蓄套餐
				basicMeal: [],
				basicMealAll: [],
				//扭蛋机
				//扭蛋机信息
				gasArguments: {
					id: 0,
					rechargeEntrance: false,
					rechargeConsume: false,
					guideBindingPhone: false,
					constraintBindingPhone: false,
					automaticRefund: false,
					understockAstrict: false,
					insertCoinsType: false,
				},
				//线下投币类型-popup
				gashaponMachine: false,
				middleValue: false,
				//说明-popup
				gashaponNotice: false,
				noticeNum: 0,
				//说明-popup
				gashaponNoticeEnd: false,
				noticeNumTwo: 0,
				//edit/add
				mealInfo: {
					price: null,
					currencyQuantity: 0,
					id: 0,
					setMealState: 1, //套餐状态;（1：启用，2：停用）
					weight: 0, //权重
					gameTime: null, //游戏时间
					give: null, //赠送金额
				},
				//套餐货币类型;（1：兑币，2：储值）
				moneyType: 2,
				//操作类型；
				operByEdit: "add",
				//兑币机
				//兑币套餐
				converCoin: [],
				//禁止编辑价格
				disAbleSetprice: false,
				//游乐车充值套餐
				ylcMeal: [],
				//售货机
				shjSwitch: false,
				shjMeal: true,
				//场地设备信息
				placeId: "",
				otherDevice: false,
				//禁止编辑价格
				coinSetprice: 0,
				//储值套餐
				conversionType: 1,
				// 类似 ndj 1-wwj 2-ndj 3-ylc 4-shj 5-dbj 6-etl 7-yxl 8-wzj
				ndjSameList: [2, 3, 4, 6, 7, 8, 5],
				// params
				params: {},
			};
		},
		onLoad(option) {
			const params = JSON.parse(option.params);
			this.params = params;
			this.getStart(params);
		},
		methods: {
			async getStart(params) {
				this.placeDeviceNum = params.deviceNum ? params.deviceNum : 0;
				if (params.id) {
					//场地信息
					let place = await placeController.getPlaceById({
						placeId: params.id,
					}).then(res => {
						if (res.code == 200) {
							this.placeInfo = res.data;
						}
					})

					//场地设备类型
					deviceController.getPlaceDeviceTypeList({
						placeId: params.id,
					}).then(res => {
						if (res.code == 200) {
							if (res.data.length) {
								this.placeDeviceTypeList = res.data;
								this.activeDeviceTypeId = this.placeDeviceTypeList[0].deviceTypeId;
								if (this.ndjSameList.includes(this.activeDeviceTypeId)) {
									// 设置信息 shj dbj etl ylc
									this.getEggSetMsg();
								}
								//shj
								if (this.activeDeviceTypeId == 4) {
									this.getShj();
									this.getMealByYlc();
								} else if (this.activeDeviceTypeId == 3) {
									//ylc
									this.getMealByYlc();
								}
								this.getComboMealList(); //ndj wwj dbj
								this.placeDeviceTypeList.forEach((item) => {
									if (item.deviceTypeId == 5) {
										this.getConverList();
									}
								});
							}
						}
					})

				} else {
					//批量设置
					this.placeDeviceTypeList = [{
						deviceTypeId: 2,
						deviceTypeName: "扭蛋机",
						deviceNum: this.placeDeviceNum,
					}, ];
					this.activeDeviceTypeId = 2;
					this.getMealAll();
				}
			},
			getImage(id) {
				let image;
				if (id) {
					const url = id == this.activeDeviceTypeId ? "A" : "";
					try {
						image = `${this.$baseUrl}appV4/type/type${url}${id}.png`;
					} catch (error) {
						image = `${this.$baseUrl}appV4/type/default${url}.png`;
					}
				} else {
					image = `${this.$baseUrl}appV4/type/type${url}.png`;
				}
				return image;
			},
			goTo(type) {
				// this.$router.push('/setMeal/nextSetmeal')
				this.$goTo("/pages/mainPackages/home/deviceModule/deviceBind")
			},

			//兑币套餐列表
			getConverList: throttleFun(async function() {
				let res = await packageController.conversionExchangeList({
					placeId: this.params.id,
					deviceType: 5,
				});
				if (res.code == 200) {
					this.converCoin = res.data;
				}
			}, 500),

			//储蓄套餐列表
			getComboMealList: throttleFun(async function() {
				let res = await packageController.getComboList({
					placeId: this.params.id,
					deviceType: this.activeDeviceTypeId,
				});
				if (res.code == 200) {
					this.basicMeal = res.data;
				}
			}, 500),

			//改套餐状态 dbj
			editMealState(meal) {
				this.$refs.coinState.showcoinState(meal);
			},
			//获取设备设置信息
			getEggSetMsg: throttleFun(async function() {
				let res = await packageController.getEggSet({
					placeId: this.params.id,
					deviceType: this.activeDeviceTypeId,
				});
				if (res.code == 200) {
					this.gasArguments = res.data;
					this.gasArguments.rechargeEntrance =
						this.gasArguments.rechargeEntrance == 1 ? true : false; //充值入口开关;1.开，0.关
					this.gasArguments.rechargeConsume =
						this.gasArguments.rechargeConsume == 1 ? true : false; //先充值后消费;1.开，0.关
					this.gasArguments.guideBindingPhone =
						this.gasArguments.guideBindingPhone == 1 ? true : false; //充值引导绑定手机;1.开，0.关
					this.gasArguments.constraintBindingPhone =
						this.gasArguments.constraintBindingPhone == 1 ? true : false; //充值强制绑定手机;1.开，0.关
					this.gasArguments.automaticRefund =
						this.gasArguments.automaticRefund == 1 ? true : false; //自动退款设置;1.开，0.关
					this.gasArguments.understockAstrict =
						this.gasArguments.understockAstrict == 1 ? true :
						false; //库存不足限制交易;1.开，0.关（库存<购买数量时限制交易
					this.gasArguments.insertCoinsType =
						this.gasArguments.insertCoinsType == 1 ? true : false; //线下投币类型;(1.线下投游戏币，2.线下投硬币)
					this.gasArguments.dyWriteOff =
						this.gasArguments.dyWriteOff == 1 ? true : false; //抖音核销;(1.开，0.关)
					this.gasArguments.meituanWriteOff =
						this.gasArguments.meituanWriteOff == 1 ? true : false; //美团核销;(1.开，2.关)
				}
			}, 500),
			//修改设备设置信息
			setEggMsg: throttleFun(async function() {
				if (this.params.placeId) {
					this.gashaponMachine = false;
				} else {
					let res = await packageController.editEggSet({
						id: this.gasArguments.id,
						rechargeEntrance: this.gasArguments.rechargeEntrance ? 1 : 0,
						rechargeConsume: this.gasArguments.rechargeConsume ? 1 : 0,
						guideBindingPhone: this.gasArguments.guideBindingPhone ? 1 : 0,
						constraintBindingPhone: this.gasArguments.constraintBindingPhone ?
							1 : 0,
						automaticRefund: this.gasArguments.automaticRefund ? 1 : 0,
						understockAstrict: this.gasArguments.understockAstrict ? 1 : 0,
						insertCoinsType: this.gasArguments.insertCoinsType ? 1 : 2,
						dyWriteOff: this.gasArguments.dyWriteOff ? 1 : 0,
						meituanWriteOff: this.gasArguments.meituanWriteOff ? 1 : 0,
					});
					if (res.code == 200) {
						this.getEggSetMsg();
						this.gashaponMachine = false;
					}
				}
			}, 500),
			//库存购买数量扭蛋机说明
			noticeEnd() {
				this.$modal("开启后，库存<购买数量时，用户将无法启动设备。有光眼异常等影响库存统计的设备请谨慎开启", {
						title: "库存<购买数量时限制交易",
						confirmText: "确定",
						showCancel: false,
					})
					.then(() => {});
			},

			//推荐批量设置套餐
			async getMealAll() {
				let res = await packageController.getMeal();
				if (res.data) {
					this.basicMealAll = res.data;
				}
			},
			deleteAllMeal(index) {
				this.basicMealAll.splice(index, 1);
			},
			clearMeal() {
				this.$modal("确定清空当前套餐设置吗？这不会影响您场地的套餐设置~", {
						title: "温馨提示",
					})
					.then(() => {
						this.basicMealAll = [];
					})
					.catch(() => {});
			},
			swapArr(index1, index2) {
				this.basicMealAll[index1] = this.basicMealAll.splice(
					index2,
					1,
					this.basicMealAll[index1]
				)[0];
			},
			//批量设置套餐
			async allSetMeal() {
				this.$modal("确定将当前套餐设置为所选场地的所有设备的套餐吗？", {
						title: "温馨提示",
					})
					.then(() => {
						//批量扭蛋机信息
						packageController.editEggSets({
							all: this.params.placeId == "All" ? 1 : 0,
							ids: this.params.placeId != "All" ?
								this.params.placeId : null,
							rechargeEntrance: this.gasArguments.rechargeEntrance ? 1 : 0,
							rechargeConsume: this.gasArguments.rechargeConsume ? 1 : 0,
							guideBindingPhone: this.gasArguments.guideBindingPhone ? 1 : 0,
							constraintBindingPhone: this.gasArguments.constraintBindingPhone ?
								1 : 0,
							automaticRefund: this.gasArguments.automaticRefund ? 1 : 0,
							understockAstrict: this.gasArguments.understockAstrict ? 1 : 0,
							insertCoinsType: this.gasArguments.insertCoinsType ? 1 : 2,
						}).then((res) => {
							if (res.code == 200) {
								this.gashaponMachine = false;
							}
						});
						let arr = [];
						this.basicMealAll.forEach((item) => {
							item.price = Math.round(item.price * 100);
							arr.push(item);
							if (arr.length === this.basicMealAll.length) {
								packageController.editSetMeals({
										all: this.params.placeId == "All" ? 1 : 0, //1=全选
										ids: this.params.placeId != "All" ?
											this.params.placeId : null,
										// price: Math.round(this.mealInfo.price*100),//价格 单位：角
										// currencyQuantity: this.mealInfo.currencyQuantity,//兑币数量
										addEditComboParams: this.basicMealAll, //套餐
										setMealState: 1, //套餐状态;（1：启用，2：停用）
										deviceType: 2, //设备类型;（兑币机，扭蛋机，娃娃机）
										moneyType: 2, //套餐货币类型;（1：兑币，2：储值）
									})
									.then((res) => {
										if (res.code == 200) {
											this.$refs.editOrAdd.hiddenPopup();
											this.$toast("批量设置成功");
											this.$router.back();
										}
									})
									.catch(() => {});
							}
						});
					})
					.catch(() => {});
			},

			//添加自定套餐
			async addMealItem() {
				let res = await packageController.addSetMeal({
					moneyType: this.moneyType, //套餐货币类型;（1：兑币，2：储值）
					price: Math.round(this.mealInfo.price * 100), //价格 单位：角
					currencyQuantity: this.mealInfo.currencyQuantity, //兑币数量
					deviceType: this.activeDeviceTypeId, //设备类型;（兑币机，扭蛋机，娃娃机）
					placeId: this.params.id, //场地id
				});
				if (res.code == 200) {
					this.$refs.editOrAdd.hiddenPopup();
					if (this.moneyType == 2) {
						this.getComboMealList();
					} else if (this.moneyType == 1) {
						this.getConverList();
					}
					this.$toast("添加成功");
				}
			},
			//编辑自定套餐
			async editMealItem(shit) {
				let res = await packageController.editSetMeal({
					id: this.mealInfo.id,
					price: Math.round(this.mealInfo.price * 100), //价格 单位：角
					currencyQuantity: this.mealInfo.currencyQuantity, //兑币数量
					setMealState: this.mealInfo.setMealState, //套餐状态;（1：启用，2：停用）
					weight: this.mealInfo.weight, //权重
				});
				if (res.code == 200) {
					this.$refs.editOrAdd.hiddenPopup();
					if (this.moneyType == 2) {
						this.getComboMealList();
					} else if (this.moneyType == 1) {
						this.getConverList();
					}
					if (shit) {
						setTimeout(() => {
							this.$toast("编辑成功");
						}, 300);
					}
				}
			},
			//上移 ndj/wwj
			shiftUp: throttleFun(async function(meal, weight) {
				this.mealInfo = meal;
				this.mealInfo.weight = weight;
				this.editMealItem();
			}, 1000),
			//下移
			shiftDown: throttleFun(async function(meal, weight) {
				this.mealInfo = meal;
				this.mealInfo.weight = weight;
				this.editMealItem();
			}, 1000),

			//恢复默认设置
			defaultMealSet(type) {
				this.$modal("确定要恢复所有默认设置？", {
						title: "温馨提示",
						confirmText: "确定",
					})
					.then(() => {
						if (this.activeDeviceTypeId == 3 || this.activeDeviceTypeId == 4) {
							packageController.defaultSettingYlc({
									moneyType: type, // 3：游乐车服务套餐，4：游乐车充值套餐
									deviceType: this.activeDeviceTypeId,
									placeId: this.params.id,
								})
								.then((res) => {
									if (res.code == 200) {
										this.$toast("恢复成功");
										if (this.activeDeviceTypeId == 3) {
											this.getComboMealList();
										}
										this.getMealByYlc();
									}
								})
								.catch(() => {});
						} else {
							packageController.comboDefaultSetting({
									placeId: this.params.id,
									deviceType: this.activeDeviceTypeId, //设备类型;（5兑币机，2扭蛋机，1娃娃机）
								})
								.then((res) => {
									if (res.code == 200) {
										this.$toast("恢复成功");
										this.getComboMealList();
										this.getConverList();
									}
								})
								.catch(() => {});
						}
					})
					.catch(() => {});
			},
			//删除自定套餐
			async deleteMealItem(id) {
				this.$modal("确定要删除充值套餐?", {
						title: "温馨提示",
						confirmText: "删除",
					})
					.then(() => {
						packageController.deleteSetMeal({
							id
						}).then((res) => {
							if (res.code == 200) {
								if (this.activeDeviceTypeId == 4) {
									this.getShj();
								} else {
									if (this.moneyType == 2) {
										this.getComboMealList();
									} else if (this.moneyType == 1) {
										this.getConverList();
									}
								}
								this.$toast("删除成功");
							}
						});
					});
			},
			//打开输入框
			editOrAddMeal(type, moneyType) {
				if (type == "add") {
					this.mealInfo.price = "";
					this.mealInfo.currencyQuantity = 0;
					this.$refs.editOrAdd.showPopup("add");
					this.operByEdit = "add";
					this.disAbleSetprice = false;
					if (moneyType == "dbj") {
						this.moneyType = 1;
					} else {
						this.moneyType = 2;
					}
				} else if (type == "all") {
					this.mealInfo.price = "";
					this.mealInfo.currencyQuantity = 0;
					this.operByEdit = "all";
					this.$refs.editOrAdd.showPopup("all");
				} else {
					this.$refs.editOrAdd.showPopup("edit");
					this.operByEdit = "edit";
					this.mealInfo.id = type.id;
					this.mealInfo.price = type.price;
					this.mealInfo.currencyQuantity = type.currencyQuantity;
					this.mealInfo.setMealState = type.setMealState;
					this.mealInfo.weight = type.weight;
					this.moneyType = type.moneyType;
					if (type.setMealType == 1 && this.activeDeviceTypeId == 5) {
						this.disAbleSetprice = true;
					} else {
						this.disAbleSetprice = false;
					}
				}
			},
			//输入确定
			confirmOper() {
				if (this.mealInfo.price < 0 || this.mealInfo.price > 1000) {
					return this.$toast("金额请设置在0~1000之间~");
				}
				if (
					this.mealInfo.currencyQuantity < 0 ||
					this.mealInfo.currencyQuantity > 99999
				) {
					return this.$toast("币数请设置在0~99999之间的正整数~");
				}
				//游乐车
				if (this.activeDeviceTypeId == 3 || this.activeDeviceTypeId == 4) {
					if (this.operByEdit == "add") {
						this.addYlc();
					} else if (this.operByEdit == "edit") {
						this.editYlc();
					} else if (this.operByEdit == "addMeal") {
						this.addMealYlc();
					} else if (this.operByEdit == "editMeal") {
						this.editMealYlc();
					}
					//售货机
				} else {
					if (this.operByEdit == "edit") {
						this.editMealItem(1);
					} else if (this.operByEdit == "add") {
						this.addMealItem();
					} else if (this.operByEdit == "all") {
						let item = {
							price: this.mealInfo.price,
							currencyQuantity: this.mealInfo.currencyQuantity,
						};
						this.basicMealAll.push(item);
						this.$refs.editOrAdd.hiddenPopup();
					}
				}
			},
			//切换设备类型
			pickerDiffType(deviceTypeId) {
				if (deviceTypeId == this.activeDeviceTypeId) {
					return;
				}
				this.activeDeviceTypeId = deviceTypeId;

				// 设备设置信息
				if (this.ndjSameList.includes(this.activeDeviceTypeId)) {
					this.getEggSetMsg();
				}

				if (deviceTypeId == 4) {
					this.getShj();
					this.getMealByYlc();
				}
				if (deviceTypeId != 3) {
					this.getComboMealList();
				}
				// ylc
				if (deviceTypeId == 3) {
					this.getComboMealList();
					this.getEggSetMsg();
					this.getMealByYlc();
				}
			},
			// 高亮设备类型 暂时只考虑游乐车
			// this.otherDevice = !this.otherDevice;
			//打开 ylc
			openYlc(type) {
				if (type == "add") {
					this.$refs.ylc.showYlc("add");
					this.operByEdit = "add";
					this.mealInfo.price = null;
					this.mealInfo.currencyQuantity = 0;
					this.mealInfo.gameTime = null;
				} else {
					this.$refs.ylc.showYlc("edit");
					this.operByEdit = "edit";
					this.mealInfo.id = type.id;
					this.mealInfo.price = type.price;
					this.mealInfo.currencyQuantity = type.currencyQuantity;
					this.mealInfo.gameTime = type.gameTime;
					this.mealInfo.setMealState = type.setMealState;
					this.mealInfo.weight = type.weight;
				}
			},
			//添加ylc 时间套餐
			async addYlc() {
				let res = await packageController.addSetMeal({
					moneyType: 3, //套餐货币类型;（1：兑币，2：储值, 3：时间套餐， 4：充值赠送套餐）
					price: Math.round(this.mealInfo.price * 100), //价格 单位：角
					currencyQuantity: this.mealInfo.currencyQuantity * 1, //兑币数量
					deviceType: this.activeDeviceTypeId * 1, //设备类型;（兑币机，扭蛋机，娃娃机）
					placeId: this.params.id * 1, //场地id
					gameTime: this.mealInfo.gameTime * 1,
				});
				if (res.code == 200) {
					this.$refs.ylc.hiddenPopup();
					this.getComboMealList();
					this.$toast("添加成功");
				}
			},
			//编辑ylc 时间套餐
			async editYlc() {
				let res = await packageController.editSetMeal({
					id: this.mealInfo.id,
					price: Math.round(this.mealInfo.price * 100), //价格 单位：角
					currencyQuantity: this.mealInfo.currencyQuantity, //兑币数量
					setMealState: 1, //套餐状态;（1：启用，2：停用）
					gameTime: this.mealInfo.gameTime,
					weight: this.mealInfo.weight,
				});
				if (res.code == 200) {
					this.$refs.ylc.hiddenPopup();
					this.getComboMealList();
					this.$toast("编辑成功");
				}
			},
			//游乐车 充值优惠套餐
			async getMealByYlc() {
				let res = await packageController.getCart({
					placeId: this.params.id,
					deviceType: this.activeDeviceTypeId,
				});
				if (res.code == 200) {
					this.ylcMeal = res.data;
				}
			},
			//删除
			deleteYlc(id) {
				this.$modal("确定要删除充值套餐?", {
						title: "温馨提示",
						confirmText: "删除",
					})
					.then(() => {
						packageController.deleteCart({
							id
						}).then((res) => {
							if (res.code == 200) {
								this.getMealByYlc();
								this.$toast("删除成功");
							}
						});
					});
			},
			//添加 ylc
			async addMealYlc() {
				let res = await packageController.addCart({
					// price: Math.round(this.mealInfo.price * 100), //价格 单位：角
					price: this.mealInfo.price,
					placeId: this.params.id * 1, //场地id
					give: this.mealInfo.give * 1,
					deviceType: this.activeDeviceTypeId,
				});
				if (res.code == 200) {
					this.$refs.ylcMealPopup.hiddenPopup();
					this.getMealByYlc();
					this.$toast("添加成功");
				}
			},
			//编辑
			async editMealYlc() {
				let res = await packageController.editCart({
					id: this.mealInfo.id,
					// price: Math.round(this.mealInfo.price * 100), //价格 单位：角
					price: this.mealInfo.price,
					give: this.mealInfo.give * 1,
				});
				if (res.code == 200) {
					this.$refs.ylcMealPopup.hiddenPopup();
					this.getMealByYlc();
					this.$toast("编辑成功");
				}
			},
			openMealYlc(type) {
				if (type == "addMeal") {
					this.$refs.ylcMealPopup.showYlc("add");
					this.operByEdit = "addMeal";
					this.mealInfo.price = "";
					this.mealInfo.give = "";
				} else {
					this.$refs.ylcMealPopup.showYlc("edit");
					this.operByEdit = "editMeal";
					this.mealInfo.id = type.id;
					this.mealInfo.price = type.price;
					this.mealInfo.give = type.give;
				}
			},
			//获取 shj
			async getShj() {
				let res = await packageController.getShjByPlace({
					placeId: this.params.id,
					type: 3, //3：时间套餐， 4: 充值赠送套餐
					deviceType: 4,
				});
				if (res.code == 200) {
					this.basicMeal = res.data;
				}
			},
			//编辑 shj
			async shjEdit() {
				let res = await packageController.editSetMeal({
					id: this.mealInfo.id,
					price: Math.round(this.mealInfo.price * 100), //价格 单位：角
					gameTime: this.mealInfo.gameTime,
					currencyQuantity: 1, //兑币数量
					setMealState: 1, //套餐状态;（1：启用，2：停用）
					weight: this.mealInfo.weight,
				});
				if (res.code == 200) {
					this.$toast("设置成功");
					this.$refs.shj.hiddenPopup();
					this.getShj();
				}
			},
			//添加 shj
			async shjAdd() {
				let res = await packageController.addSetMeal({
					moneyType: 3, //套餐货币类型;（1：兑币，2：储值, 3：时间套餐， 4：充值赠送套餐）
					deviceType: this.activeDeviceTypeId * 1, //设备类型;（兑币机，扭蛋机，娃娃机）
					placeId: this.params.id * 1, //场地id
					price: Math.round(this.mealInfo.price * 100), //价格 单位：角
					currencyQuantity: 1, //兑币数量
					gameTime: this.mealInfo.gameTime * 1,
				});
				if (res.code == 200) {
					this.$toast("添加成功");
					this.$refs.shj.hiddenPopup();
					this.getShj();
				}
			},
			//添加/编辑 shj
			addShjMeal(meal) {
				if (meal == "add") {
					this.mealInfo.price = null;
					this.mealInfo.gameTime = null;
					this.mealInfo.id = null;
					this.operByEdit = "add";
				} else {
					this.mealInfo.price = meal.price;
					this.mealInfo.gameTime = meal.gameTime;
					this.mealInfo.id = meal.id;
					this.mealInfo.weight = meal.weight;
					this.operByEdit = "edit";
				}
				this.$refs.shj.showPopup();
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import 'index.scss'
</style>