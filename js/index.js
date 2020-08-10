		var value = "";
		var valueId = "";

		function show() {

			$("#treeDemo").show();
			initSeries('CM0', 'T', '0003');

		}

		function hide() {
			$("#treeDemo").hide();

		}

		function init() {
			initSeriesBySimple('CM0', 'T', '0003');
		}

		function initSeries(compTypeId, order, suppId) {

		$.get(window.api+"values",null,null).done(function(){
				$.ajax({
				url: "http://10.0.0.33:8888/open/classification/getClassCompType.action",
				method: 'POST',
				data: {
					compTypeId: compTypeId,
					order: order,
					supplierId: suppId
				},
				dataType: "json",
				success: function(res) {
					if(res.code == 0) {
						var setting = {
							view: {

								dblClickExpand: false,
								showLine: true,
								selectedMulti: false
							},

							data: {
								simpleData: {
									enable: true
								}
							},
							callback: {
								onClick: zTreeOnClick,
								beforeExpand: zTreeBeforeExpand
								
							}

						};

						var zNodes = res.data.options;

						$(document).ready(function() {
							$.fn.zTree.init($("#treeDemo"), setting, zNodes);
						});

						function zTreeOnClick(event, treeId, treeNode) {

							alert(treeNode.id + ", " + treeNode.name);

						}

						function zTreeBeforeExpand(treeId, treeNode) {

							var zTree = $.fn.zTree.getZTreeObj(treeId);

							if(treeNode.isParent) {
								/*如果是父节点*/
								if(treeNode.open) {
									/*父节点为展开状态，则折叠父节点*/
									zTree.expandNode(treeNode, false, true, true, false);
								} else {
									/*父节点为折叠状态,点击展开后加载子节点 */
									var parentId = treeNode.id;
									$.ajax({
										url: "http://10.0.0.33:8888/open/classification/getClassParentId.action",
										type: "POST",
										dataType: "json", // 字符串格式  
										data: {
											parentId: parentId
										},
										success: function(res) {

											// 将json字符串转成json对象  
											//    zNodes = eval("(" + data1 + ")");  
											zNodes = res.data.options;
											zTree.addNodes(treeNode, zNodes);

										},
										error: function() {
											alert("获取市公司数据失败!");
										}
									});
								}
							}
						}

					}
				}

			})
		})
		}

		function initSeriesBySimple(compTypeId, order, suppId) {

		$.get(window.api+"values",null,null).done(function(){
				$.ajax({
				url: "http://10.0.0.33:8888/open/classification/getClassCompType.action",
				method: 'POST',
				data: {
					compTypeId: compTypeId,
					order: order,
					supplierId: suppId
				},
				dataType: "json",
				success: function(res) {
					if(res.code == 0) {
						value = res.data.options[2].name;
						valueId = res.data.options[2].id;
						$("#series").val(value);
						$("#seriesId").val(valueId);
						//alert($("#seriesId").val());
					}
				}

			})
		})
		}

		<!--

		//-->