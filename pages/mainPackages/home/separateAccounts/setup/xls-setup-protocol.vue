<template>
	<u-popup :show="protocolMaskOne" round="20" mode="center">
		<view class="protocolMask" v-if="type === 'protocol'">
			<p class="mask-title">支付服务协议</p>
			<view class="content">
				<dl class="text">
					<dd>
						本支付服务协议（以下简称“本协议”）由广州中土信息技术责任有限公司（以下简称“本公司”）和由为[<span
							class="underline"></span>公司]负责运营管理的网站（以下简称“网站”）或/且移动客户端（以下简称“移动客户端”）的注册用户（以下简称“用户”）签订。本公司仅为用户提供支付服务。
					</dd>
					<view class="m-20">
						<dt>
							【审慎阅读】本公司在此特别提醒用户在点击同意本协议之前，务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议管辖条款。除非用户接收本协议所有条款，否则用户将无权使用本公司于本协议项下所提供的服务。用户一经使用本公司的服务即视为用户对本协议全部条款已充分理解并完全接受。如有违反，用户将独立承担相应的法律责任及法律后果。
						</dt>
						<br />
						<dt>一、 支付服务协议的确认</dt>
						<dt>二、 支付服务的相关定义</dt>
						<dt>三、 支付账户的注册和使用</dt>
						<dt>四、 支付账户的服务内容</dt>
						<dt>五、 使用支付账户的注意事项</dt>
						<dt>六、 用户合法使用支付账户的承诺</dt>
						<dt>七、 用户权益保障和隐私保护</dt>
						<dt>八、 责任限制</dt>
						<dt>九、 知识产权的保护</dt>
						<dt>十、 违约责任</dt>
						<dt>十一、法律适用和管辖</dt>
					</view>
					<dt>一、 支付服务协议的确认</dt>
					<dd>
						<p class="weight">
							1.
							本协议有助于用户了解本公司为用户提供的本协议项下的服务内容及用户使用服务的权利和义务，请用户仔细阅读（特别是以粗体标注的内容）。
						</p>
						<p class="weight">
							2.
							本协议同时包括《支付服务协议》以及本公司可能不时发布的相关协议、服务声明、各项规则等内容。所有相关协议、声明、规则为本协议不可分割的一部分，与本协议具有同等法律效力。各相关协议、声明、规则有约定，而本协议没有约定的，以各相关协议、声明、规则约定为准。
						</p>
						<p class="weight">
							3.
							在本协议履行的过程中，本公司有权根据国家法律法规变化以及公司业务发展情况，在必要时修改本协议，本协议一旦发生变动，将会以移动客户端界面或网站公告的方式予以公布，不再另行单独通知用户。如果用户继续使用本公司的服务，则视为用户已经理解、同意并接受本协议的修改，也将遵循修改后的协议来使用本公司的服务；同时，就用户在本协议修改前通过移动客户端或网站发生的交易及其效力，视为用户已同意并已按照本协议及有关规则进行了相应的授权和追认。若用户不同意修改后的协议内容，请立即停止使用本公司提供的服务。
						</p>
					</dd>
					<dt>二、 支付服务相关的定义</dt>
					<dd>
						<p>
							1.
							支付账户（或账户）：指用户通过向本公司提交身份要素，经过身份认证并且用户同意本协议后，本公司为用户开立的用于记录预付交易资金余额、用户凭以发起支付指令、反映交易明细信息的电子簿记。
						</p>
						<p>
							2.
							身份要素：指本公司用于识别用户身份的信息要素，包括但不限于用户的姓名、身份证件、身份证件号、生物识别信息（例如人脸信息等）、手机号码、短信验证码等信息。
						</p>
						<p>
							3.
							有权机关：指依照法律法规等有权要求采取查询、冻结或扣划资金等措施的单位，包括但不限于公安机关、检察院、法院、海关、税务机关等。
						</p>
						<p>
							4.
							冻结：指按照前述有权机关要求进行的冻结。被冻结余额不能用于支付、提现或转账等，被冻结账户可能无法使用。
						</p>
						<p>
							5.
							限制：指除有权机关冻结情况之外，用户的支付账户部分或全部功能不能使用，以及支付账户余额不能使用。
						</p>
						<p>
							6.
							止付：指支付账户余额不能使用的限制措施，例如不能用于支付、提现或转账等服务。
						</p>
						<p>
							7.
							余额服务：指基于账户余额可以使用的提现等服务。除本协议另有规定外，余额服务的功能及收付款额度将按照《非银行支付机构网络支付业务管理办法》及其他监管规定进行调整。
						</p>
					</dd>
					<dt>三、 支付账户的注册和使用</dt>
					<dd>
						<p class="weight">(一) 支付账户的注册</p>
						<p class="weight">
							1.
							用户应具有法律规定的完全民事权利能力和行为能力，且为能够独立承担民事责任的自然人、合法开展经营活动或其他业务的法人或其他组织或机构。若用户不具备前述条件，应立即停止注册和使用支付账户。
						</p>
						<p>
							2.
							用户应使用真实身份信息注册并使用支付账户，并依注册提示提供用户的正确、完整、有效的相关资料及其他必要的身份要素，用户不得冒用或妨碍其他组织、机构或个人注册使用支付账户。
						</p>
						<p>
							3.
							用户有义务维护和更新用户的身份要素，确保其持续的准确性、完整性和有效性，并承担因用户的身份要素缺失、陈旧或不真实而造成的任何损失。若本公司有合理理由怀疑用户提供的身份信息及相关资料错误、不实、过时或不完整的，本公司有权暂停或终止向用户提供部分或全部支付服务，并对此不承担任何责任。
						</p>
						<p>
							4.
							本公司有权通过银行或其他第三方机构验证用户的身份要素。本公司有权将从用户采集的身份要素提供给第三方校验，以便进行身份认证第三方也有权将用户的信息提供给本公司，以便本公司进行验证。
						</p>
					</dd>
					<dt>(二) 支付账户的使用</dt>
					<dd>
						<p>
							身份要素是本公司识别用户身份的依据，请用户务必妥善保管。使用身份要素进行的操作、发出的指令视为用户本人做出。<span
								class="weight">因用户的原因造成的支付账户、密码等信息被冒用、盗用或非法使用，由此引起的风险和损失需要由用户自行承担。 </span>用户同意：
						</p>
						<p class="weight">
							1.
							妥善保管支付账户及密码，不应转让或借予他人使用，用户应对以该账户进行的一切活动承担全部法律责任。如因用户泄露密码或身份信息导致无法使用本协议项下服务或发生资金被盗等权益受损，本公司不承担责任。
						</p>
						<p class="weight">
							2.
							如发现有他人冒用或盗用支付账户及密码等任何其他未经合法授权之情形，或发生其他可能危及到用户资金安全情形时，应立即以有效方式通知本公司，向本公司申请暂停相关服务。如因用户未能及时有效通知，本公司对造成的损失不承担任何责任。本公司对用户的请求采取行动需要合理期限，在此之前，本公司对已执行的指令及(或)所导致的用户的损失不承担任何责任。
						</p>
						<p>
							3.
							支付账户仅限用户本人使用，不得向任何其他第三方出售、出租、转让或者以其他形式进行有偿或无偿转让或提供使用。
						</p>
						<p>
							4.
							合理使用支付账户，不从事任何违反法律、法规等具有约束力的规范性文件的行为。
						</p>
						<p>
							5.
							基于运行和交易安全的需要，本公司可能会暂停或者限制支付账户的部分服务功能，或增加新的功能。
						</p>
						<p>
							6.
							为了维护良好的网络环境，本公司有时需要了解用户使用支付服务的真实背景及目的，如要求用户提供相关信息或资料的，还需用户配合提供。
						</p>
						<p>
							7.
							为了用户的交易安全，在使用支付服务时，请用户事先自行核实交易对方的身份信息（如交易对方是否具有完全民事行为能力）并谨慎决定是否使用支付服务与对方进行交易。
						</p>
						<p class="weight">
							8.
							当用户的支付账号出现异常风险或超过六个月无任何主动交易时，本公司有权关闭用户的支付账户部分功能（包括但不限于：提现等），如用户需重新启用需要通过身份验证方可再次激活该支付账户。
						</p>
					</dd>
					<dt>四、 支付账户的服务内容</dt>
					<dd>
						<p>
							支付服务是本公司向用户提供的支付服务，是受用户委托代用户收付款的资金转移服务。<strong>收付款服务是本公司为用户提供的代为收取或代为支付款项的服务。</strong>用户向本公司发出代收款项的指令后，非经法律程序或非依本协议之约定，该指令不可撤销。
						</p>
						<p>通过支付账户实现收付款的功能有如下几类：</p>
						<p>
							1.
							<strong>提现：</strong>用户可对支付账户的余额划转至用户本人的银行账户。该银行账户开户名需与用户的姓名或名称一致。除被有权机关冻结、止付或被采取其他限制措施外，本公司将于收到提现指令后的合理时间内，将相应款项汇入该银行账户。用户理解，根据用户提供的账户所属银行不同或资金清算通道不同，或会有到账时间差异，本公司不对到账时间作保证。
						</p>
						<p>
							2.
							本公司有权随时增加、减少或改造服务内容，并同时新增或调整相应规则，届时本公司将通过移动客户端公告的方式予以公布，不做另行通知。若用户在本公司公告规则后继续使用本服务的，表示用户已充分阅读、理解并接受新增或调整的规则内容。
						</p>
					</dd>
					<dt>五、 使用支付账户的注意事项</dt>
					<dd>
						<p>
							为了保障用户使用本公司支付服务时的合法权益，本公司提醒用户注意以下事项：
						</p>
						<p>（一） <strong>身份认证</strong></p>
						<p>
							1.
							身份认证是指：根据法律法规及监管规定，用户按照要求向本公司提交本人真实、完整、有效的含有身份要素的信息及证明材料，并授权本公司通过银行或其他第三方机构验证用户的身份信息，或通过第三方获得用户相关信息。<strong>由于身份认证或交易验证不通过的，本公司有权拒绝提供支付服务。</strong>用户申请身份认证应同时遵守以下几点：
						</p>
						<p>（1） 用户不得冒用任何第三方名义进行身份认证；</p>
						<p>
							（2）
							用户有义务维护和更新本人的身份信息，确保其持续的准确性、完整性和有效性。用户通过身份认证后需要对信息修改的，应向本公司提交相应资料，由本公司重新认证后进行修改；
						</p>
						<p>
							（3）
							用户承担因身份信息缺失、陈旧或不真实而造成的任何损失，若本公司有合理理由怀疑用户的身份信息不真实、不合法或过时的，本公司有权不经通知先行暂停或终止为用户提供任何账户服务；
						</p>
						<p>（4） 用户同意本公司保存用户提交的身份信息。</p>
						<p>
							2.
							<strong>为了满足相关监管规定的要求，也为了用户的资金安全，在出现下列情形时，请用户积极配合本公司核对用户的有效身份证件或其他必要身份要素，留存有效身份证件的彩色照片，且完成相关身份认证：</strong>
						</p>
						<p>
							（1）
							用户办理充值、收取或支付超过指定限额的（限额以最新的监管规定及本公司最新的风险管控要求为准）；
						</p>
						<p>（2） 用户使用本公司的服务购买理财产品的；</p>
						<p>（3） 用户要求变更身份信息或用户身份信息已过有效期的；</p>
						<p>（4） 用户的交易行为或交易情况出现异常的；</p>
						<p>（5） 用户的身份信息或相关资料存在疑点的；</p>
						<p>
							（6） 存在应核对或留存用户身份证件或其他必要文件的其他情形的。
						</p>
						<p>
							3.<strong>
								为了满足相关监管规定的要求，请用户按照本公司要求的时间提供用户的身份信息以完成身份认证，否则用户可能无法进行收款、提现等操作，且本公司可能对用户的账户余额进行止付或关闭用户的支付账户。</strong>
						</p>
						<p>
							4.
							<strong>若用户存在如下情形时，本公司有权采取包括但不限于以下措施：有权不经通知先行暂停、中止或终止用户名下全部或部分支付账户的使用（包括但不限于对账户名下的款项和在途交易采取取消交易、止付等限制措施）。</strong>
						</p>
						<p>（1） 用户违反了法律法规的规定或本协议的约定；</p>
						<p>（2） 根据相关法律法规或有权机关的要求；</p>
						<p>（3） 用户的账户操作、资金流向等存在异常时；</p>
						<p>（4） 用户的账户可能产生风险的；</p>
						<p>
							（5）
							用户在参加市场活动时有批量注册支付账户、交易内容不符或作弊等违反活动规则、违反诚实信用原则的；
						</p>
						<p>
							（6）
							他人向用户支付账户错误汇入资金等导致用户可能存在不当获利的；用户遭到他人投诉，且对方已经提供了一定证据的；
						</p>
						<p>
							（7）
							用户可能错误地操作他人支付账户，或者将他人账户进行了身份验证的。
							除（1）、（2）规定的情形外，如用户申请恢复服务、解除上述止付或限制，请用户向本公司提供相关资料及身份证明等文件，以便本公司进行核实。
						</p>
						<p><strong>（二） 支付服务规则 </strong></p>
						<p>
							（1）
							本公司有权根据《非金融机构支付服务管理办法》、《非银行支付机构网络支付业务管理办法》等相关规定对用户支付账户功能和交易额度进行限制和调整。<strong>当用户的身份认证和交易校验情况符合（或不满足）相关规定时，本公司有权对用户拥有的支付账户采取开启（关闭）相关功能、增加（或降低）交易额度的措施，并要求用户补充提交相关信息。若用户拒不提交，或提交的信息仍不符合相关规定，本公司有权对用户采取暂停、限制或终止服务。</strong>
						</p>
						<p>
							（2）
							用户认可支付账户的使用记录、交易数据等均以本公司的系统记录为准。如用户对该等数据存有异议的，可及时向本公司提出，本公司会根据用户提供的相关证据积极予以核实。
						</p>
						<p>
							（3）
							本公司承担账户系统运行，向用户提供本协议所约定之各项服务。对账户系统的信息处理过程中的安全、保密、及时性负责。
						</p>
						<p>
							（4）
							本公司保障用户账户中的资金独立存放，本公司进行资金的止付、扣划完全来自于用户的授权或及用户对商户的授权。
						</p>
						<p>（三） 本公司的承诺和声明</p>
						<p>
							<strong>1.
								本公司并非银行，本协议项下涉及的资金转移均通过银行来实现，用户接受资金在转移途中产生的合理时间。</strong>
						</p>
						<p>
							<strong>2.
								基于相关法律法规的规定，对本协议项下的服务，本公司均无法提供担保、垫资。</strong>
						</p>
						<p>
							<strong>3.
								本公司提请用户注意，支付账户所记录的资金余额不同于用户本人的银行存款，不受《存款保险条例》保护，其实质为用户委托本公司保管的、所有权归属于用户的预付价值。该预付价值对应的货币资金虽然属于用户，但不以用户本人名义存放在银行，而是以本公司的名义存放在银行，并且由本公司向银行发起资金调拨指令。</strong>
						</p>
						<p>
							<strong>4.
								本公司提请用户注意，本公司依据用户指令提供支付服务。非因本公司过错，产生的任何损失，由用户自行承担。若由此给第三方造成任何损失的，用户应承担全部赔偿责任。</strong>
						</p>
						<p>（四） <strong>风险提示</strong></p>
						<p>
							<strong>1.
								用户充分知悉，本公司仅提供支付相关服务，用户应承担使用支付服务时其资金的货币贬值、汇率波动等风险。</strong>
						</p>
						<p>
							<strong>2.
								用户充分知悉，网上交易有风险，用户与他人因网上交易产生的商品或服务质量、数量、交易金额、交货时间等纠纷及损失，
								应由用户独立承担责任。</strong>
						</p>
						<p>
							<strong>3.
								用户使用本公司的服务购买金融类产品时，为了用户的利益，建议用户仔细阅读金融类产品的协议以及页面提示，
								确认销售机构及产品信息，谨慎评估风险后再购买。</strong>
						</p>
						<p>
							<strong>4.
								用户对本公司所提示的风险和列示措施、说明完全理解和同意，承诺采取相关风险防范措施以尽量避免或减小风险。</strong>
						</p>
						<p>
							（五） 服务费用
							在用户使用相关服务时，本公司有权向用户收取相应服务费。具体收费方式及收费标准以移动客户端界面或网站所示或与本公司的其他约定为准。
							本公司保留制订及调整收费方式及收费标准之权利。
						</p>
						<p><strong>六、 用户合法使用支付账户的承诺</strong></p>
						<p>
							<strong>1.
								用户需要遵守中华人民共和国相关法律法规的规定，不得将本公司的服务用于非法目的（包括用于禁止或限制交易物品的交易），
								也不得以非法方式使用本公司的服务。</strong>
						</p>
						<p>
							<strong>2.
								用户不得利用本公司提供的服务从事侵害他人合法权益的行为，否则本公司有权拒绝提供服务，
								且用户应承担所有相关法律责任。因用户的违法行为导致本公司损失的（包括但不限于对他方的先行赔付），
								本公司有权从账户余额或其他本公司保管的用户资金中扣收相应赔偿金，或向用户进行追偿。违法行为包括但不限于：</strong>
						</p>
						<p>（1） 冒用他人名义使用本服务；</p>
						<p>（2） 从事洗钱、恐怖融资等行为；</p>
						<p>（3） 非法使用他人银行账户或无效银行账户；</p>
						<p>
							（4）
							违反《银行卡业务管理办法》使用银行卡，或利用信用卡套取现金；
						</p>
						<p>
							（5）
							对账户使用过程中的任何计算机数据进行拦截、破解、篡改或对账户服务系统进行非正常的登录；
						</p>
						<p>
							（6） 因欺诈、非授权交易、套现等非法行为给任何第三方造成损失的；
						</p>
						<p>（7） 其他违反法律法规等具有约束力的规范性文件的行为。</p>
						<p>
							<strong>3.
								用户理解，本公司的服务有赖于系统的准确运行及操作。若出现系统差错、故障、
								或用户不当获利等情形，用户同意本公司可以采取更正差错、扣划款项等适当纠正措施。</strong>
						</p>
						<p>
							<strong>4.
								为防控交易风险，用户有积极协助本公司处理风险事件、调查可疑交易的义务。
								本公司有权在风险事件或可疑交易发生时，要求用户在合理期限前提供相关辅助材料及情况说明等相关内容以证明其行为的正常。
								对于用户发生的风险事件或可疑交易，本公司有权在用户提供情况说明、澄清交易事实前，暂停向用户提供服务。
								若用户拒绝提供或无法证明其行为正常的，则本公司有权拒绝或停止为其提供服务，造成本公司损失的，
								本公司有权从账户余额或其他本公司保管的用户资金中扣收相应赔偿金，或向用户进行追偿。</strong>
						</p>
						<p><strong>七、 用户权益保障及隐私保护</strong></p>
						<p>(一) 客户权益保障承诺</p>
						<p>
							本公司一直秉承“客户第一”的原则，努力为用户带来微小而美好的改变，保障用户的合法权益。
						</p>
						<p>(二) 用户资金保障</p>
						<p>
							本公司始终重视保护用户的资金安全，将自有资金和用户资金分开存放，承诺不挪用、
							占用用户资金。如用户在使用本公司支付服务的过程中，资金被盗，应立即与本公司联系。
						</p>
						<p>(三) 隐私权保护</p>
						<p>
							1.
							本公司尊重并保护用户隐私，本公司依法收集、使用及共享用户的个人信息
							（个人信息是以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息，
							包括用户注册账户所提供的全部身份要素）。
						</p>
						<p>
							2.
							为本协议的目的，即用户能更好的使用本公司的服务，用户签订本协议即表示用户授权同意本公司依法可收集、使用及共享用户的个人信息。
						</p>
						<p>
							<strong>3.
								本公司按现有技术提供相应的安全措施来保护用户的个人信息，提供合理的安全保障，
								本公司将在任何时候尽力使用户的个人信息不被泄露、毁损或丢失。</strong>
						</p>
						<p>
							<strong>4. 用户的交易相对方、用户访问的第三方网站经营者、
								用户使用的第三方服务提供者和由本公司处接受用户的个人信息的第三方可能有资金的隐私权保护政策；
								本公司会尽商业上的合理努力去要求这些主体对用户的个人信息采取保护措施，
								但本公司无法保证这些主体一定会按照本公司的要求采取保护措施，亦不对这些主体的行为及后果承担任何责任。
								如果用户发现这些第三方创建的网页或第三方开发的应用程序存在风险时，建议用户终止相关操作以保护用户的合法权益</strong>
						</p>
					</dd>
					<dt>八、 责任限制</dt>
					<dd>
						<p>
							<strong>1.
								因黑客攻击、计算机病毒、网络服务商或银行系统故障等非因本公司故意或重大过失而造成的用户损失，本公司不承担责任。</strong>
						</p>
						<p>
							<strong>2.
								因台风、地震、洪水、雷电或恐怖袭击等不可抗力造成的用户损失，本公司不承担责任。</strong>
						</p>
						<p>
							<strong>3.
								本公司为用户提供账户资金结算服务，对用户发生的所有投资风险不承担法律责任。
								不承担借款人违约损失，对用户亦不承担任何担保责任。</strong>
						</p>
						<p>
							<strong>4.
								在适用法律允许的最大范围内，本公司对账户系统的功能，不做任何责任的保证，
								不对用户因使用或不能使用所造成的任何损失承担责任。</strong>
						</p>
					</dd>
					<dt>九、 知识产权的保护</dt>
					<dd>
						<p>
							1.
							本公司所有电子及其他形式的相关信息，包括但不限于程序、著作、表格、图片、档案、资料、信函等均由本公司或相关主体拥有知识产权。
						</p>
						<p>
							2.
							非经本公司书面同意，用户除使用服务需要外，不得复制、篡改、传播、发行或以任何其他形式向第三方披露。
						</p>
						<p>
							<strong>3.
								用户不得对本公司的系统和程序采取反向工程手段进行破解，不得对上述系统和程序
								（包括但不限于源程序、目标程序、技术文档、客户端至服务器端的数据、服务器数据）进行复制、修改、编译、整合或篡改，
								不得修改或增减本公司系统的功能。</strong>
						</p>
					</dd>
					<dt>十、 违约责任</dt>
					<dd>
						<strong>用户因违反本协议及任何账户相关业务规则，均构成违约。因用户违约而给本公司造成的损失的，
							本公司有权扣收用户的账户余额或其他本公司保管的用户资金，并有权依法追究用户违约责任。</strong>
					</dd>
					<dt>十一、 法律适用和管辖</dt>
					<dd>
						<p>
							1.
							本协议的订立、生效、变更、履行、解除、终止和解释以及由此产生的所有事项均适用中华人民共和国之法律、法规。
						</p>
						<p>
							<strong>2.
								涉及本协议履行过程中任何之争议，均以广州市番禺区人民法院作为诉讼管辖法院。</strong>
						</p>
					</dd>
				</dl>
				<view class="filter-panel"></view>
			</view>
			<view class="btn" @click="protocolMaskOne = !protocolMaskOne">
				我知道了
			</view>
		</view>
		<view class="protocolMask" v-else>
			<p class="mask-title">“自动分账” 注意事项</p>
			<p class="red-tips">
				声明：
				平台仅提供平台服务，您与合作方之间所发生的一切财务关系（如收益分成结算、财务纠纷等），均与平台无关。
			</p>
			<view class="content">
				<view class="text">
					<p>
						<!-- 于第二天 0 时生效 -->
						1、分成设置(包括:是否自动结算到账,分成人员的添加和删除,分成比例修改)成功后,将立即生效。
					</p>
					<p>
						2、分成设置修改后,在分成页面显示的是修改后的内容，但要到生效日期才会生效。（未生效之前，仍然是执行设置前的分成方案）。
					</p>
					<p>
						3、如果您上游有代理商参与设备分账,且您场地添加了其他分成方和分成比例，那么您添加的分成方所分得的金额为剔除代理商分成金额以后剩下的金额再乘以您设置的分成比例。代理商分账只对代理商专属的设备生效，非代理商设备是不会发生代理商分账的。
					</p>
					<p>
						4、开启“自动结算到账”,并成功绑定银行卡后，当天的“在线支付”
						分成收益
						,第二天24:00前将直接自动结算打款到各分成方的银行卡(D+1结算)。
					</p>
					<p>
						5、手续费:按交易金额的0.6%扣除手续费（手续费=交易金额*0.6%）。手续费由各分成方平摊，即各分成方到账的金额是已扣除手续费的。
					</p>
					<p>
						6、若关闭了 “自动结算到账”
						开关，将不会自动结算到各分成方银行卡，全部统一结算到商家银行卡。
					</p>
					<p>
						7、商家需帮各分成方绑定银行卡(需上传“身份证正、反面,银行卡正面”)。如果商家未为分成方上传银行卡、身份证信息
						（或者分成方的银行卡、身份证信息审核未通过），则对于未成功绑定银行卡的分成方的钱款，将会结算到商家的银行卡中。
						只有那些成功绑定银行卡的分成方，才会自动结算到分成方银行卡。
					</p>
					<p>
						8、【依法纳税】提示:依法纳税是每个公民、企业应尽的义务，您应对销售额/营业额超过法定免征额部分及时、
						足额地向税务主管机关申报纳税。
					</p>
					<p>
						9、服务声明:“自动分账”功能仅限商家与业务合作方之间的合法结算，实现分成金额自动结算到账，减少人工统计和线下转账的人工成本。
						请合法使用该功能。如平台监测到分账业务疑似异常，则平台有权终止该商家账号的自动分账功能。
					</p>
				</view>
				<view class="filter-panel"></view>
			</view>
			<view class="btn" @click="protocolMaskOne = !protocolMaskOne">我知道了</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				type: 'protocol',
				protocolMaskOne: false,
			}
		},
		methods: {
			openPupop(type) {
				this.type = type;
				this.protocolMaskOne = !this.protocolMaskOne;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.protocolMask {
		width: 640rpx;
		height: 1000rpx;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: 20rpx;

		.mask-title {
			font-size: 38rpx;
			font-weight: 700;
			text-align: center;
			color: rgba(0, 0, 0, 1);
			padding: 40rpx 0 20rpx;
		}

		.red-tips {
			text-align: justify;
			padding: 10rpx 40rpx 20rpx;
			color: #fe5259;
			font-size: 26rpx;
		}

		.content {
			flex: 1;
			overflow-y: scroll;
			font-size: 26rpx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 44rpx;
			overflow-x: hidden;
			padding: 0 40rpx 50rpx;

			dd {
				font-size: 26rpx;
				color: #707070;
				margin-bottom: 20rpx;
				text-align: justify;
				margin-inline-start: 0rpx;
				line-height: 44rpx;
			}

			.underline {
				display: inline-block;
				height: 2rpx;
				width: 200rpx;
				vertical-align: text-bottom;
				background-color: #000;
			}

			p {
				font-size: 26rpx;
				color: #707070;
				margin-bottom: 20rpx;
				text-align: justify;
				line-height: 44rpx;
			}

			.m-20 {
				margin-bottom: 40rpx;
			}

			dt {
				font-size: 30rpx;
				color: #333;
				text-align: justify;
				line-height: 44rpx;
			}

			.text {
				padding: 20rpx 0;
				color: #8f8f94;
				text-align: justify;
			}

			.filter-panel {
				position: absolute;
				bottom: 100rpx;
				left: 0;
				width: 100%;
				background: rgba(255, 255, 255, 0.6);
				height: 60rpx;
			}
		}

		.btn {
			background: #fff;
			height: 100rpx;
			width: 100%;
			border-top: 2rpx solid rgba(229, 229, 229, 1);
			font-size: 36rpx;
			font-weight: 400;
			color: rgba(0, 122, 255, 1);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>