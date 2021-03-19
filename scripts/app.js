(function(document) {
	'use strict';
	var app = document.querySelector('#staffMe');
	
	// Data definition
	app.jobs = {
				waiting: [],
				todo: [],
				done: []
			};
	app.users = [
		{
			id:0,
			pseudo:'Guilhem',
			avatar:'gcaz.jpg',
			desc: 'Je veux bien faire les CV sur les propales des autres',
			dispos: [
								{wLoad: 0.5	, dateFrom: '25/04', dateTo : '29/04'},
								{wLoad: 0.5	, dateFrom: '02/05', dateTo : '02/05'},
								{wLoad: 1		, dateFrom: '09/05', dateTo : '13/05'}
							],
			requests: [
								],
			skills: ['Gestion de Projet','ERP','CVs'],
			jobs: {
				waiting: [],
				todo: [],
				done: [],
				othersWaiting: [],
				othersTodo: [],
				othersDone: []
			}
		},
		{
			id:1,
			pseudo:'Jonathan',
			avatar:'jtai.png',
			desc: 'Je veux pas faire les CV sur une propale',
			dispos: [
								{wLoad: 10		, dateFrom: '25/04', dateTo : '13/05'}
							],
			requests: [
								],
			skills: ['Achats','Gestion de Projet','Commerce'],
			jobs: {
				waiting: [],
				todo: [],
				done: [],
				othersWaiting: [],
				othersTodo: [],
				othersDone: []
			}
		},
		{
			id:2,
			pseudo:'Clément',
			avatar:'cver.png',
			desc: 'Je me la coule douce sous les oliviers, cong',
			dispos: [
								{wLoad: 0.5	, dateFrom: '25/04', dateTo : '25/04'},
								{wLoad: 1	  , dateFrom: '29/04', dateTo : '29/04'},
								{wLoad: 0.5	, dateFrom: '02/05', dateTo : '02/05'},
								{wLoad: 1		, dateFrom: '09/05', dateTo : '13/05'}
							],
			requests: [
										{desc : 'Besoin aide sur CV propale', 				wLoad: 0.5, dateFrom: '25/04', dateTo : '25/04'},
										{desc : 'Besoin aide sur plan de formation', 	wLoad: 1, 	dateFrom: '25/05', dateTo : '25/05'},
										{desc : 'Besoin aide sur étude Airbus', 			wLoad: 3, 	dateFrom: '01/06', dateTo : '10/06'}
								],
			skills: ['Gestion d\'Affaires','ERP','Short'],
			jobs: {
				waiting: [],
				todo: [],
				done: [],
				othersWaiting: [],
				othersTodo: [],
				othersDone: []
			}
		},
		{
			id:3,
			pseudo:'François',
			avatar:'fgir.png',
			desc: 'Je suis un chef, yep',
			dispos: [
								{wLoad: 1		, dateFrom: '09/05', dateTo : '13/05'}
							],
			requests: [
										{desc : 'Besoin aide sur CV propale', wLoad: 0.5, dateFrom: '25/04', dateTo : '25/04'}
								],
			skills: ['SAP','Supply Chain','Sanofi','Commerce'],
			jobs: {
				waiting: [],
				todo: [],
				done: [],
				othersWaiting: [],
				othersTodo: [],
				othersDone: []
			}
		}
	];
	// Global variables & functions
	app.title = 'Staff Me If You Can';
	app.connect = function(event, detail, sender) {
		//console.log(event.model.u);
		app.isAuth = true;
		app.navicon = 'arrow-back';
		app.user = event.model.u;
		// Collect all jobs connected to the current user
		app.jobs.waiting.forEach(function(job){
			if(job.userTo.id == app.user.id){
				app.push('user.jobs.waiting',job);
			}
			if(job.userFrom.id == app.user.id){
				app.push('user.jobs.othersWaiting',job);
			}
		});
		app.jobs.todo.forEach(function(job){
			if(job.userTo.id == app.user.id){
				app.push('user.jobs.todo',job);
			}
			if(job.userFrom.id == app.user.id){
				app.push('user.jobs.othersTodo',job);
			}
		});
		app.jobs.done.forEach(function(job){
			if(job.userTo.id == app.user.id){
				app.push('user.jobs.done',job);
			}
			if(job.userFrom.id == app.user.id){
				app.push('user.jobs.othersDone',job);
			}
		});
			console.log(app.user);
		app.sumJobs = app.user.jobs.waiting.length + app.user.jobs.todo.length + app.user.jobs.done.length + app.user.jobs.othersWaiting.length + app.user.jobs.othersTodo.length + app.user.jobs.othersDone.length;
	};
	app.disconnect = function(e) {
		if(app.user){
			app.user.jobs = {
				waiting: [],
				todo: [],
				done: [],
				othersWaiting: [],
				othersTodo: [],
				othersDone: []
			};
			app.users[app.user.id] = app.user;
		}		
		app.isAuth = false;
		app.navicon = 'rowing';
		app.selected = 0;
		app.fabVis = true;
		app.diagTitle = 'Nouvelle dispo';
		app.user = {avatar:'blank.png'};
	};
	app.openDialog = function(e){
		if(app.isAuth){
			var dial = app.$.dialog;
			if(app.selected == 0){app.diagTitle = 'Nouvelle dispo';}
			if(app.selected == 1){app.diagTitle = 'Nouvelle demande';}
			dial.open();
		}
	};
	app.newSel = function(){
		if(app.selected < 2){app.fabVis = true;}
		else{app.fabVis = false;}
	};
	app.addItem = function(e){
		if(app.selected == 0){app.addDisp(e);}
		if(app.selected == 1){app.addReq(e);}
	};
	app.addSkill = function(e){
		var skill = app.$.newSkill.value;
		if(skill){app.push('user.skills',skill)};
		app.$.newSkill.value = null;
	};
	app.addDisp = function(e){
		// console.log('add disp');
		var wLoad = app.$.newDispWorkLoad.value;
		var dateFrom = app.$.newDispDateFrom.value;
		var dateTo = app.$.newDispDateTo.value;
		var disp = {wLoad: wLoad, dateFrom: dateFrom, dateTo : dateTo};
		// console.log(disp);
		app.push('user.dispos',disp);
		app.$.newDispWorkLoad.value = null;
		app.$.newDispDateFrom.value = null;
		app.$.newDispDateFrom.value = null;
	};
	app.addReq = function(e){
		// console.log('add request');
		var desc = app.$.newReqDesc.value;
		var wLoad = app.$.newReqWorkLoad.value;
		var dateFrom = app.$.newReqDateFrom.value;
		var dateTo = app.$.newReqDateTo.value;
		var req = {desc : desc, wLoad: wLoad, dateFrom: dateFrom, dateTo : dateTo};
		if(req){app.push('user.requests',req)};
		// console.log(req);
		app.$.newReqDesc.value = null;
		app.$.newReqWorkLoad.value = null;
		app.$.newReqDateFrom.value = null;
		app.$.newReqDateTo.value = null;
	};
	app.selectCandidate = function(e){
		// console.log(e.detail);
		// Add req in current user's jobs and in final user's jobs
		var req = e.detail.request;
		var job = {desc : req.desc, wLoad: req.wLoad, dateFrom: req.dateFrom, dateTo : req.dateTo, userTo: e.detail.user, userFrom: app.user};
		app.push('jobs.waiting',job);
		app.push('user.jobs.othersWaiting',job);
		app.arrayDelete('user.requests',req);
		app.sumJobs = app.user.jobs.waiting.length + app.user.jobs.todo.length + app.user.jobs.done.length + app.user.jobs.othersWaiting.length + app.user.jobs.othersTodo.length + app.user.jobs.othersDone.length;
		// console.log(app.users);
	};
	app.removeSkill = function(e){
		app.arrayDelete('user.skills',e.model.s);
	};
	app.removeDispo = function(e){
		app.arrayDelete('user.dispos',e.model.d);
	};
	app.openProfile = function(e){
		if(app.isAuth){
			var prof = app.$.profile;
			prof.open();
		}
	};
	app.saveProfile = function(e){
		app.users[app.user.id] = app.user;
		app.notifyPath('app.users',app.users);
	};
	app.toggleWaiting = function(e){
		app.$.waiting.toggle();
	};
	app.toggleTodo = function(e){
		app.$.todo.toggle();
	};
	app.toggleDone = function(e){
		app.$.done.toggle();
	};
	app.toggleOthersWaiting = function(e){
		app.$.othersWaiting.toggle();
	};
	app.toggleOthersTodo = function(e){
		app.$.othersTodo.toggle();
	};
	app.toggleOthersDone = function(e){
		app.$.othersDone.toggle();
	};
	app.denyProp = function(e){
		app.arrayDelete('user.jobs.waiting',e.model.w);
		app.arrayDelete('jobs.waiting',e.model.w);
		var req = {desc : e.model.w.desc, wLoad: e.model.w.wLoad, dateFrom: e.model.w.dateFrom, dateTo : e.model.w.dateTo};
		app.push('users.'+e.model.w.userFrom.id+'.requests',req);
		app.sumJobs = app.user.jobs.waiting.length + app.user.jobs.todo.length + app.user.jobs.done.length + app.user.jobs.othersWaiting.length + app.user.jobs.othersTodo.length + app.user.jobs.othersDone.length;
	};
	app.cancelProp = function(e){
		app.arrayDelete('user.jobs.othersWaiting',e.model.w);
		app.arrayDelete('jobs.waiting',e.model.w);
		var req = {desc : e.model.w.desc, wLoad: e.model.w.wLoad, dateFrom: e.model.w.dateFrom, dateTo : e.model.w.dateTo};
		app.push('user.requests',req);
		app.sumJobs = app.user.jobs.waiting.length + app.user.jobs.todo.length + app.user.jobs.done.length + app.user.jobs.othersWaiting.length + app.user.jobs.othersTodo.length + app.user.jobs.othersDone.length;
	};
	app.acceptProp = function(e){
		app.push('user.jobs.todo',e.model.w);
		app.push('jobs.todo',e.model.w);
		app.arrayDelete('user.jobs.waiting',e.model.w);
		app.arrayDelete('jobs.waiting',e.model.w);
	};
	app.doneTodo = function(e){
		app.push('user.jobs.done',e.model.t);
		app.arrayDelete('user.jobs.todo',e.model.t);
		app.push('jobs.done',e.model.t);
		app.arrayDelete('jobs.todo',e.model.t);
	};
	app.removeOthersDone = function(e){
		app.arrayDelete('user.jobs.othersDone',e.model.d);
		app.arrayDelete('jobs.done',e.model.d);
		app.sumJobs = app.user.jobs.waiting.length + app.user.jobs.todo.length + app.user.jobs.done.length + app.user.jobs.othersWaiting.length + app.user.jobs.othersTodo.length + app.user.jobs.othersDone.length;
	};
	app.sumJobs = 0;
	app.disconnect();
	
})(document);
