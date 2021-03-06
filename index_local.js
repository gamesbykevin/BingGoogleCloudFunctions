//used to connect to the database
const Firestore = require('@google-cloud/firestore');

//how we will access our database to store cookies
const cookieTableName = "bing-cookie-data-table";
const cookieIdMobile = 1;	//store cookies for mobile under a different id
const cookieIdDesktop = 2;	//store cookies for desktop under a different id
const myProjectId = "my-new-project-id-1234";

//our firestore reference so we can authenticate connecting
const firestore = new Firestore({
	projectId: myProjectId,
	keyFilename: 'My-New-Project-Credentials.json'
});

//used as web driver to browse the web
const puppeteer = require('puppeteer');

//needed to format search url
const util = require('util');

//object used to send emails
const nodemailer = require('nodemailer'); 

//bing login credentials
const username = 'username';
const password = 'password';

//smtp server credentials
const usernameMail = 'username';
const passwordMail = 'password';

//who do we notify
const emailNotify = 'test@aol.com';

//edge desktop browser user agent string
const userAgentDesktop = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931';

//chrome mobile browser user agent string
const userAgentMobile = 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36';

//we will check our points when browsing our desktop app
const pointsContainerDesktop = '#id_rc';

//how many searches do we perform
const searchLimitDesktop = 35;
const searchLimitMobile = 25;

//where do we start
const urlHomePage = 'http://bing.com';

//our search url
const urlSearch = 'https://www.bing.com/search?q=%s';

//page containing our reward urls to earn bonus points
const urlRewards = 'https://account.microsoft.com/rewards';

//how long to wait between actions
const wait = 2000;

//how long do we wait for a web page to load
const loadWebPageTimeout = 30000;

//list of words for our search so it appears legit
const words = 'about,search,other,which,their,there,contact,business,online,first,would,services,these,click,service,price,people,state,email,health,world,products,music,should,product,system,policy,number,please,support,message,after,software,video,where,rights,public,books,school,through,links,review,years,order,privacy,items,company,group,under,general,research,january,reviews,program,games,could,great,united,hotel,center,store,travel,comments,report,member,details,terms,before,hotels,right,because,local,those,using,results,office,national,design,posted,internet,address,within,states,phone,shipping,reserved,subject,between,forum,family,based,black,check,special,prices,website,index,being,women,today,south,project,pages,version,section,found,sports,house,related,security,county,american,photo,members,power,while,network,computer,systems,three,total,place,download,without,access,think,north,current,posts,media,control,water,history,pictures,personal,since,guide,board,location,change,white,small,rating,children,during,return,students,shopping,account,times,sites,level,digital,profile,previous,events,hours,image,title,another,shall,property,class,still,money,quality,every,listing,content,country,private,little,visit,tools,reply,customer,december,compare,movies,include,college,value,article,provide,source,author,press,learn,around,print,course,canada,process,stock,training,credit,point,science,advanced,sales,english,estate,select,windows,photos,thread,category,large,gallery,table,register,however,october,november,market,library,really,action,start,series,model,features,industry,human,provided,required,second,movie,forums,march,better,yahoo,going,medical,friend,server,study,staff,articles,feedback,again,looking,issues,april,never,users,complete,street,topic,comment,things,working,against,standard,person,below,mobile,party,payment,login,student,programs,offers,legal,above,recent,stores,problem,memory,social,august,quote,language,story,options,rates,create,young,america,field,paper,single,example,girls,password,latest,question,changes,night,texas,poker,status,browse,issue,range,building,seller,court,february,always,result,audio,light,write,offer,groups,given,files,event,release,analysis,request,china,making,picture,needs,possible,might,month,major,areas,future,space,cards,problems,london,meeting,become,interest,child,enter,share,similar,garden,schools,million,added,listed,learning,energy,delivery,popular,stories,journal,reports,welcome,central,images,notice,original,radio,until,color,council,includes,track,archive,others,format,least,society,months,safety,friends,trade,edition,messages,further,updated,having,provides,david,already,green,studies,close,common,drive,specific,several,living,called,short,display,limited,powered,means,director,daily,beach,natural,whether,period,planning,database,official,weather,average,window,france,region,island,record,direct,records,district,calendar,costs,style,front,update,parts,early,miles,sound,resource,present,either,document,works,material,written,federal,hosting,rules,final,adult,tickets,thing,centre,cheap,finance,minutes,third,gifts,europe,reading,topics,cover,usually,together,videos,percent,function,getting,global,economic,player,projects,lyrics,often,submit,germany,amount,watch,included,though,thanks,deals,various,words,linux,james,weight,heart,received,choose,archives,points,magazine,error,camera,clear,receive,domain,methods,chapter,makes,policies,beauty,manager,india,position,taken,listings,models,michael,known,cases,florida,simple,quick,wireless,license,friday,whole,annual,later,basic,shows,google,church,method,purchase,active,response,practice,hardware,figure,holiday,enough,designed,along,among,death,writing,speed,brand,discount,higher,effects,created,remember,yellow,increase,kingdom,thought,stuff,french,storage,japan,doing,loans,shoes,entry,nature,orders,africa,summary,growth,notes,agency,monday,european,activity,although,western,income,force,overall,river,package,contents,players,engine,album,regional,supplies,started,views,plans,double,build,screen,exchange,types,lines,continue,across,benefits,needed,season,apply,someone,anything,printer,believe,effect,asked,sunday,casino,volume,cross,anyone,mortgage,silver,inside,solution,mature,rather,weeks,addition,supply,nothing,certain,running,lower,union,jewelry,clothing,names,robert,homepage,skills,islands,advice,career,military,rental,decision,leave,british,teens,woman,sellers,middle,cable,taking,values,division,coming,tuesday,object,lesbian,machine,length,actually,score,client,returns,capital,follow,sample,shown,saturday,england,culture,flash,george,choice,starting,thursday,courses,consumer,airport,foreign,artist,outside,levels,channel,letter,phones,ideas,summer,allow,degree,contract,button,releases,homes,super,matter,custom,virginia,almost,located,multiple,asian,editor,cause,focus,featured,rooms,female,thomas,primary,cancer,numbers,reason,browser,spring,answer,voice,friendly,schedule,purpose,feature,comes,police,everyone,approach,cameras,brown,physical,medicine,ratings,chicago,forms,glass,happy,smith,wanted,thank,unique,survey,prior,sport,ready,animal,sources,mexico,regular,secure,simply,evidence,station,round,paypal,favorite,option,master,valley,recently,probably,rentals,built,blood,improve,larger,networks,earth,parents,nokia,impact,transfer,kitchen,strong,carolina,wedding,hospital,ground,overview,owners,disease,italy,perfect,classic,basis,command,cities,william,express,award,distance,peter,ensure,involved,extra,partners,budget,rated,guides,success,maximum,existing,quite,selected,amazon,patients,warning,horse,forward,flowers,stars,lists,owner,retail,animals,useful,directly,housing,takes,bring,catalog,searches,trying,mother,traffic,joined,input,strategy,agent,valid,modern,senior,ireland,teaching,grand,testing,trial,charge,units,instead,canadian,normal,wrote,ships,entire,leading,metal,positive,fitness,chinese,opinion,football,abstract,output,funds,greater,likely,develop,artists,guest,seems,trust,contains,session,multi,republic,vacation,century,academic,graphics,indian,expected,grade,dating,pacific,mountain,filter,mailing,vehicle,longer,consider,northern,behind,panel,floor,german,buying,match,proposed,default,require,outdoor,morning,allows,protein,plant,reported,politics,partner,authors,boards,faculty,parties,mission,string,sense,modified,released,stage,internal,goods,unless,richard,detailed,japanese,approved,target,except,ability,maybe,moving,brands,places,pretty,spain,southern,yourself,winter,battery,youth,pressure,boston,keywords,medium,break,purposes,dance,itself,defined,papers,playing,awards,studio,reader,virtual,device,answers,remote,external,apple,offered,theory,enjoy,remove,surface,minimum,visual,variety,teachers,martin,manual,block,subjects,agents,repair,civil,steel,songs,fixed,wrong,hands,finally,updates,desktop,classes,paris,sector,capacity,requires,jersey,fully,father,electric,quotes,officer,driver,respect,unknown,worth,teacher,workers,georgia,peace,campus,showing,creative,coast,benefit,progress,funding,devices,grant,agree,fiction,watches,careers,beyond,families,museum,blogs,accepted,former,complex,agencies,parent,spanish,michigan,columbia,setting,scale,stand,economy,highest,helpful,monthly,critical,frame,musical,angeles,employee,chief,gives,bottom,packages,detail,changed,heard,begin,colorado,royal,clean,switch,russian,largest,african,titles,relevant,justice,connect,bible,basket,applied,weekly,demand,suite,vegas,square,chris,advance,auction,allowed,correct,charles,nation,selling,piece,sheet,seven,older,illinois,elements,species,cells,module,resort,facility,random,pricing,minister,motion,looks,fashion,visitors,monitor,trading,forest,calls,whose,coverage,couple,giving,chance,vision,ending,clients,actions,listen,discuss,accept,naked,clinical,sciences,markets,lowest,highly,appear,lives,currency,leather,patient,actual,stone,commerce,perhaps,persons,tests,village,accounts,amateur,factors,coffee,settings,buyer,cultural,steve,easily,poster,closed,holidays,zealand,balance,graduate,replies,initial,label,thinking,scott,canon,league,waste,minute,provider,optional,sections,chair,fishing,effort,phase,fields,fantasy,letters,motor,context,install,shirt,apparel,crime,count,breast,johnson,quickly,dollars,websites,religion,claim,driving,surgery,patch,measures,kansas,chemical,doctor,reduce,brought,himself,enable,exercise,santa,leader,diamond,israel,servers,alone,meetings,seconds,jones,arizona,keyword,flight,congress,username,produced,italian,pocket,saint,freedom,argument,creating,drugs,joint,premium,fresh,attorney,upgrade,factor,growing,stream,hearing,eastern,auctions,therapy,entries,dates,signed,upper,serious,prime,samsung,limit,began,louis,steps,errors,shops,efforts,informed,thoughts,creek,worked,quantity,urban,sorted,myself,tours,platform,labor,admin,nursing,defense,machines,heavy,covered,recovery,merchant,expert,protect,solid,became,orange,vehicles,prevent,theme,campaign,marine,guitar,finding,examples,saying,spirit,claims,motorola,affairs,touch,intended,towards,goals,election,suggest,branch,charges,serve,reasons,magic,mount,smart,talking,latin,avoid,manage,corner,oregon,element,birth,virus,abuse,requests,separate,quarter,tables,define,racing,facts,column,plants,faith,chain,identify,avenue,missing,domestic,sitemap,moved,houston,reach,mental,viewed,moment,extended,sequence,attack,sorry,centers,opening,damage,reserve,recipes,gamma,plastic,produce,placed,truth,counter,failure,follows,weekend,dollar,ontario,films,bridge,native,williams,movement,printing,baseball,owned,approval,draft,chart,played,contacts,jesus,readers,clubs,jackson,equal,matching,offering,shirts,profit,leaders,posters,variable,expect,parking,compared,workshop,russia,codes,kinds,seattle,golden,teams,lighting,senate,forces,funny,brother,turned,portable,tried,returned,pattern,named,theatre,laser,earlier,sponsor,warranty,indiana,harry,objects,delete,evening,assembly,nuclear,taxes,mouse,signal,criminal,issued,brain,sexual,powerful,dream,obtained,false,flower,passed,supplied,falls,opinions,promote,stated,stats,hawaii,appears,carry,decided,covers,hello,designs,maintain,tourism,priority,adults,clips,savings,graphic,payments,binding,brief,ended,winning,eight,straight,script,served,wants,prepared,dining,alert,atlanta,dakota,queen,credits,clearly,handle,sweet,criteria,pubmed,diego,truck,behavior,enlarge,revenue,measure,changing,votes,looked,festival,ocean,flights,experts,signs,depth,whatever,logged,laptop,vintage,train,exactly,explore,maryland,concept,nearly,eligible,checkout,reality,forgot,handling,origin,gaming,feeds,billion,scotland,faster,dallas,bought,nations,route,followed,broken,frank,alaska,battle,anime,speak,protocol,query,equity,speech,rural,shared,sounds,judge,bytes,forced,fight,height,speaker,filed,obtain,offices,designer,remain,managed,failed,marriage,korea,banks,secret,kelly,leads,negative,austin,toronto,theater,springs,missouri,andrew,perform,healthy,assets,injury,joseph,ministry,drivers,lawyer,figures,married,proposal,sharing,portal,waiting,birthday,gratis,banking,brian,toward,slightly,assist,conduct,lingerie,calling,serving,profiles,miami,comics,matters,houses,postal,controls,breaking,combined,ultimate,wales,minor,finish,noted,reduced,physics,spent,extreme,samples,davis,daniel,reviewed,forecast,removed,helps,singles,cycle,amounts,contain,accuracy,sleep,pharmacy,brazil,creation,static,scene,hunter,crystal,famous,writer,chairman,violence,oklahoma,speakers,drink,academy,dynamic,gender,cleaning,concerns,vendor,intel,officers,referred,supports,regions,junior,rings,meaning,ladies,henry,ticket,guess,agreed,soccer,import,posting,presence,instant,viewing,majority,christ,aspects,austria,ahead,scheme,utility,preview,manner,matrix,devel,despite,strength,turkey,proper,degrees,delta,seeking,inches,phoenix,shares,daughter,standing,comfort,colors,cisco,ordering,alpha,appeal,cruise,bonus,bookmark,specials,disney,adobe,smoking,becomes,drives,alabama,improved,trees,achieve,dress,dealer,nearby,carried,happen,exposure,gambling,refer,miller,outdoors,clothes,caused,luxury,babes,frames,indeed,circuit,layer,printed,removal,easier,printers,adding,kentucky,mostly,taylor,prints,spend,factory,interior,revised,optical,relative,amazing,clock,identity,suites,feeling,hidden,victoria,serial,relief,revision,ratio,planet,copies,recipe,permit,seeing,proof,tennis,bedroom,empty,instance,licensed,orlando,bureau,maine,ideal,specs,recorded,pieces,finished,parks,dinner,lawyers,sydney,stress,cream,trends,discover,patterns,boxes,hills,fourth,advisor,aware,wilson,shape,irish,stations,remains,greatest,firms,operator,generic,usage,charts,mixed,census,exist,wheel,transit,compact,poetry,lights,tracking,angel,keeping,attempt,matches,width,noise,engines,forget,array,accurate,stephen,climate,alcohol,greek,managing,sister,walking,explain,smaller,newest,happened,extent,sharp,lesbians,export,managers,aircraft,modules,sweden,conflict,versions,employer,occur,knows,describe,concern,backup,citizens,heritage,holding,trouble,spread,coach,kevin,expand,audience,assigned,jordan,affect,virgin,raised,directed,dealers,sporting,helping,affected,totally,plate,expenses,indicate,blonde,anderson,organic,albums,cheats,guests,hosted,diseases,nevada,thailand,agenda,anyway,tracks,advisory,logic,template,prince,circle,grants,anywhere,atlantic,edward,investor,leaving,wildlife,cooking,speaking,sponsors,respond,sizes,plain,entered,launch,checking,costa,belgium,guidance,trail,symbol,crafts,highway,buddy,observed,setup,booking,glossary,fiscal,styles,denver,filled,channels,ericsson,appendix,notify,blues,portion,scope,supplier,cables,cotton,biology,dental,killed,border,ancient,debate,starts,causes,arkansas,leisure,learned,notebook,explorer,historic,attached,opened,husband,disabled,crazy,upcoming,britain,concert,scores,comedy,adopted,weblog,linear,bears,carrier,edited,constant,mouth,jewish,meter,linked,portland,concepts,reflect,deliver,wonder,lessons,fruit,begins,reform,alerts,treated,mysql,relating,assume,alliance,confirm,neither,lewis,howard,offline,leaves,engineer,replace,checks,reached,becoming,safari,sugar,stick,allen,relation,enabled,genre,slide,montana,tested,enhance,exact,bound,adapter,formal,hockey,storm,micro,colleges,laptops,showed,editors,threads,supreme,brothers,presents,dolls,estimate,cancel,limits,weapons,paint,delay,pilot,outlet,czech,novel,ultra,winner,idaho,episode,potter,plays,bulletin,modify,oxford,truly,epinions,painting,universe,patent,eating,planned,watching,lodge,mirror,sterling,sessions,kernel,stocks,buyers,journals,jennifer,antonio,charged,broad,taiwan,chosen,greece,swiss,sarah,clark,terminal,nights,behalf,liquid,nebraska,salary,foods,gourmet,guard,properly,orleans,saving,empire,resume,twenty,newly,raise,prepare,avatar,illegal,hundreds,lincoln,helped,premier,tomorrow,decide,consent,drama,visiting,downtown,keyboard,contest,bands,suitable,millions,lunch,audit,chamber,guinea,findings,muscle,clicking,polls,typical,tower,yours,chicken,attend,shower,sending,jason,tonight,holdem,shell,province,catholic,governor,seemed,swimming,spyware,formula,solar,catch,pakistan,reliable,doubt,finder,unable,periods,tasks,attacks,const,doors,symptoms,resorts,biggest,memorial,visitor,forth,insert,gateway,alumni,drawing,ordered,fighting,happens,romance,bruce,split,themes,powers,heaven,pregnant,twice,focused,egypt,bargain,cellular,norway,vermont,asking,blocks,normally,hunting,diabetes,shift,bodies,cutting,simon,writers,marks,flexible,loved,mapping,numerous,birds,indexed,superior,saved,paying,cartoon,shots,moore,granted,choices,carbon,spending,magnetic,registry,crisis,outlook,massive,denmark,employed,bright,treat,header,poverty,formed,piano,sheets,patrick,puerto,displays,plasma,allowing,earnings,mystery,journey,delaware,bidding,risks,banner,charter,barbara,counties,ports,dreams,blogger,stands,teach,occurred,rapid,hairy,reverse,deposit,seminar,latina,wheels,specify,dutch,formats,depends,boots,holds,router,concrete,editing,poland,folder,womens,upload,pulse,voting,courts,notices,detroit,metro,toshiba,strip,pearl,accident,resident,possibly,airline,regard,exists,smooth,strike,flashing,narrow,threat,surveys,sitting,putting,vietnam,trailer,castle,gardens,missed,malaysia,antique,labels,willing,acting,heads,stored,logos,antiques,density,hundred,strange,mention,parallel,honda,amended,operate,bills,bathroom,stable,opera,doctors,lesson,cinema,asset,drinking,reaction,blank,enhanced,entitled,severe,generate,deluxe,humor,monitors,lived,duration,pursuant,fabric,visits,tight,domains,contrast,flying,berlin,siemens,adoption,meant,capture,pounds,buffalo,plane,desire,camping,meets,welfare,caught,marked,driven,measured,medline,bottle,marshall,massage,rubber,closing,tampa,thousand,legend,grace,susan,adams,python,monster,villa,columns,hamilton,cookies,inner,tutorial,entity,cruises,holder,portugal,lawrence,roman,duties,valuable,ethics,forever,dragon,captain,imagine,brings,heating,scripts,stereo,taste,dealing,commit,airlines,liberal,livecam,trips,sides,turns,cache,jacket,oracle,matthew,lease,aviation,hobbies,proud,excess,disaster,console,commands,giant,achieved,injuries,shipped,seats,alarm,voltage,anthony,nintendo,usual,loading,stamps,appeared,franklin,angle,vinyl,mining,ongoing,worst,imaging,betting,liberty,wyoming,convert,analyst,garage,exciting,thongs,ringtone,finland,morgan,derived,pleasure,honor,oriented,eagle,desktops,pants,columbus,nurse,prayer,quiet,postage,producer,cheese,comic,crown,maker,crack,picks,semester,fetish,applies,casinos,smoke,apache,filters,craft,apart,fellow,blind,lounge,coins,gross,strongly,hilton,proteins,horror,familiar,capable,douglas,debian,epson,elected,carrying,victory,madison,editions,mainly,ethnic,actor,finds,fifth,citizen,vertical,prize,occurs,absolute,consists,anytime,soldiers,guardian,lecture,layout,classics,horses,dirty,wayne,donate,taught,worker,alive,temple,prove,wings,breaks,genetic,waters,promise,prefer,ridge,cabinet,modem,harris,bringing,evaluate,tiffany,tropical,collect,toyota,streets,vector,shaved,turning,buffer,purple,larry,mutual,pipeline,syntax,prison,skill,chairs,everyday,moves,inquiry,ethernet,checked,exhibit,throw,trend,sierra,visible,desert,oldest,rhode,mercury,steven,handbook,navigate,worse,summit,victims,spaces,burning,escape,coupons,somewhat,receiver,cialis,boats,glance,scottish,arcade,richmond,russell,tells,obvious,fiber,graph,covering,platinum,judgment,bedrooms,talks,filing,foster,modeling,passing,awarded,trials,tissue,clinton,masters,bonds,alberta,commons,fraud,spectrum,arrival,pottery,emphasis,roger,aspect,awesome,mexican,counts,priced,crash,desired,inter,closer,assumes,heights,shadow,riding,firefox,expense,grove,venture,clinic,korean,healing,princess,entering,packet,spray,studios,buttons,funded,thompson,winners,extend,roads,dublin,rolling,memories,nelson,arrived,creates,faces,tourist,mayor,murder,adequate,senator,yield,grades,cartoons,digest,lodging,hence,entirely,replaced,radar,rescue,losses,combat,reducing,stopped,lakes,closely,diary,kings,shooting,flags,baker,launched,shock,walls,abroad,ebony,drawn,arthur,visited,walker,suggests,beast,operated,targets,overseas,dodge,counsel,pizza,invited,yards,gordon,farmers,queries,ukraine,absence,nearest,cluster,vendors,whereas,serves,woods,surprise,partial,shoppers,couples,ranking,jokes,simpson,twiki,sublime,palace,verify,globe,trusted,copper,dicke,kerry,receipt,supposed,ordinary,nobody,ghost,applying,pride,knowing,reporter,keith,champion,cloudy,linda,chile,plenty,sentence,throat,ignore,maria,uniform,wealth,vacuum,dancing,brass,writes,plaza,outcomes,survival,quest,publish,trans,jonathan,whenever,lifetime,pioneer,booty,acrobat,plates,acres,venue,athletic,thermal,essays,vital,telling,fairly,coastal,config,charity,excel,modes,campbell,stupid,harbor,hungary,traveler,segment,realize,enemy,puzzle,rising,aluminum,wells,wishlist,opens,insight,secrets,lucky,latter,thick,trailers,repeat,syndrome,philips,penalty,glasses,enables,iraqi,builder,vista,jessica,chips,terry,flood,arena,pupils,stewart,outcome,expanded,casual,grown,polish,lovely,extras,centres,jerry,clause,smile,lands,troops,indoor,bulgaria,armed,broker,charger,believed,cooling,trucks,divorce,laura,shopper,tokyo,partly,nikon,candy,pills,tiger,donald,folks,sensor,exposed,telecom,angels,deputy,sealed,loaded,scenes,boost,spanking,founded,chronic,icons,moral,catering,finger,keeps,pound,locate,trained,roses,bread,tobacco,wooden,motors,tough,roberts,incident,gonna,dynamics,decrease,chest,pension,billy,revenues,emerging,worship,craig,herself,churches,damages,reserves,solve,shorts,minority,diverse,johnny,recorder,facing,nancy,tones,passion,sight,defence,patches,refund,towns,trembl,divided,emails,cyprus,insider,seminars,makers,hearts,worry,carter,legacy,pleased,danger,vitamin,widely,phrase,genuine,raising,paradise,hybrid,reads,roles,glory,bigger,billing,diesel,versus,combine,exceed,saudi,fault,babies,karen,compiled,romantic,revealed,albert,examine,jimmy,graham,bristol,margaret,compaq,slowly,rugby,portions,infant,sectors,samuel,fluid,grounds,regards,unlike,equation,baskets,wright,barry,proven,cached,warren,studied,reviewer,involves,profits,devil,grass,comply,marie,florist,cherry,deutsch,kenya,webcam,funeral,nutten,earrings,enjoyed,chapters,charlie,quebec,dennis,francis,sized,manga,noticed,socket,silent,literary,signals,theft,swing,symbols,humans,analog,facial,choosing,talent,dated,seeker,wisdom,shoot,boundary,packard,offset,payday,philip,elite,holders,believes,swedish,poems,deadline,robot,witness,collins,equipped,stages,winds,powder,broadway,acquired,assess,stones,entrance,gnome,roots,losing,attempts,gadgets,noble,glasgow,impacts,gospel,shore,loves,induced,knight,loose,linking,appeals,earned,illness,islamic,pending,parker,lebanon,kennedy,teenage,triple,cooper,vincent,secured,unusual,answered,slots,disorder,routine,toolbar,rocks,titans,wearing,sought,genes,mounted,habitat,firewall,median,scanner,herein,animated,judicial,integer,bachelor,attitude,engaged,falling,basics,montreal,carpet,struct,lenses,binary,genetics,attended,dropped,walter,besides,hosts,moments,atlas,strings,feels,torture,deleted,mitchell,ralph,warner,embedded,inkjet,wizard,corps,actors,liver,liable,brochure,morris,petition,eminem,recall,antenna,picked,assumed,belief,killing,bikini,memphis,shoulder,decor,lookup,texts,harvard,brokers,diameter,ottawa,podcast,seasons,refine,bidder,singer,evans,herald,literacy,fails,aging,plugin,diving,invite,alice,latinas,suppose,involve,moderate,terror,younger,thirty,opposite,rapidly,dealtime,intro,mercedes,clerk,mills,outline,tramadol,holland,receives,jeans,fonts,refers,favor,veterans,sigma,xhtml,occasion,victim,demands,sleeping,careful,arrive,sunset,tracked,moreover,minimal,lottery,framed,aside,licence,michelle,essay,dialogue,camps,declared,aaron,handheld,trace,disposal,florists,packs,switches,romania,consult,greatly,blogging,cycling,midnight,commonly,inform,turkish,pentium,quantum,murray,intent,largely,pleasant,announce,spoke,arrow,sampling,rough,weird,inspired,holes,weddings,blade,suddenly,oxygen,cookie,meals,canyon,meters,merely,passes,pointer,stretch,durham,permits,muslim,sleeve,netscape,cleaner,cricket,feeding,stroke,township,rankings,robin,robinson,strap,sharon,crowd,olympic,remained,entities,customs,rainbow,roulette,decline,gloves,israeli,medicare,skiing,cloud,valve,hewlett,explains,proceed,flickr,feelings,knife,jamaica,shelf,timing,liked,adopt,denied,fotos,britney,freeware,donation,outer,deaths,rivers,tales,katrina,islam,nodes,thumbs,seeds,cited,targeted,skype,realized,twelve,founder,decade,gamecube,dispute,tired,titten,adverse,excerpt,steam,drinks,voices,acute,climbing,stood,perfume,carol,honest,albany,restore,stack,somebody,curve,creator,amber,museums,coding,tracker,passage,trunk,hiking,pierre,jelsoft,headset,oakland,colombia,waves,camel,lamps,suicide,archived,arabia,juice,chase,logical,sauce,extract,panama,payable,courtesy,athens,judges,retired,remarks,detected,decades,walked,arising,nissan,bracelet,juvenile,afraid,acoustic,railway,cassette,pointed,causing,mistake,norton,locked,fusion,mineral,steering,beads,fortune,canvas,parish,claimed,screens,cemetery,planner,croatia,flows,stadium,fewer,coupon,nurses,proxy,lanka,edwards,contests,costume,tagged,berkeley,voted,killer,bikes,gates,adjusted,bishop,pulled,shaped,seasonal,farmer,counters,slave,cultures,norfolk,coaching,examined,encoding,heroes,painted,lycos,zdnet,artwork,cosmetic,resulted,portrait,ethical,carriers,mobility,floral,builders,struggle,schemes,neutral,fisher,spears,bedding,joining,heading,equally,bearing,combo,seniors,worlds,guilty,haven,tablet,charm,violent,basin,ranch,crossing,cottage,drunk,crimes,resolved,mozilla,toner,latex,branches,anymore,delhi,holdings,alien,locator,broke,nepal,zimbabwe,browsing,resolve,melissa,moscow,thesis,nylon,discs,rocky,bargains,frequent,nigeria,ceiling,pixels,ensuring,hispanic,anybody,diamonds,fleet,untitled,bunch,totals,marriott,singing,afford,starring,referral,optimal,distinct,turner,sucking,cents,reuters,spoken,omega,stayed,civic,manuals,watched,saver,thereof,grill,redeem,rogers,grain,regime,wanna,wishes,depend,differ,ranging,monica,repairs,breath,candle,hanging,colored,verified,formerly,situated,seeks,herbal,loving,strictly,routing,stanley,retailer,vitamins,elegant,gains,renewal,opposed,deemed,scoring,brooklyn,sisters,critics,spots,hacker,madrid,margin,solely,salon,norman,turbo,headed,voters,madonna,murphy,thinks,thats,soldier,phillips,aimed,justin,interval,mirrors,tricks,reset,brush,expansys,panels,repeated,assault,spare,kodak,tongue,bowling,danish,monkey,filename,skirt,florence,invest,honey,analyzes,drawings,scenario,lovers,atomic,approx,arabic,gauge,junction,faced,rachel,solving,weekends,produces,chains,kingston,sixth,engage,deviant,quoted,adapters,farms,imports,cheat,bronze,sandy,suspect,macro,sender,crucial,adjacent,tuition,spouse,exotic,viewer,signup,threats,puzzles,reaching,damaged,receptor,laugh,surgical,destroy,citation,pitch,autos,premises,perry,proved,imperial,dozen,benjamin,teeth,cloth,studying,stamp,lotus,salmon,olympus,cargo,salem,starter,upgrades,likes,butter,pepper,weapon,luggage,burden,tapes,zones,races,stylish,maple,grocery,offshore,depot,kenneth,blend,harrison,julie,emission,finest,realty,janet,apparent,phpbb,autumn,probe,toilet,ranked,jackets,routes,packed,excited,outreach,helen,mounting,recover,lopez,balanced,timely,talked,debug,delayed,chuck,explicit,villas,ebook,exclude,peeing,brooks,newton,anxiety,bingo,whilst,spatial,ceramic,prompt,precious,minds,annually,scanners,xanax,fingers,sunny,ebooks,delivers,necklace,leeds,cedar,arranged,theaters,advocacy,raleigh,threaded,qualify,blair,hopes,mason,diagram,burns,pumps,footwear,beijing,peoples,victor,mario,attach,licenses,utils,removing,advised,spider,ranges,pairs,trails,hudson,isolated,calgary,interim,assisted,divine,approve,chose,compound,abortion,dialog,venues,blast,wellness,calcium,newport,indians,shield,harvest,membrane,prague,previews,locally,pickup,mothers,nascar,iceland,candles,sailing,sacred,morocco,chrome,tommy,refused,brake,exterior,greeting,ecology,oliver,congo,botswana,delays,olive,cyber,verizon,scored,clone,dicks,velocity,lambda,relay,composed,tears,oasis,baseline,angry,silicon,compete,lover,belong,honolulu,beatles,rolls,thomson,barnes,malta,daddy,ferry,rabbit,seating,exports,omaha,electron,loads,heather,passport,motel,unions,treasury,warrant,solaris,frozen,occupied,royalty,scales,rally,observer,sunshine,strain,ceremony,somehow,arrested,yamaha,hebrew,gained,dying,laundry,stuck,solomon,placing,stops,homework,adjust,assessed,enabling,filling,imposed,silence,focuses,soviet,treaty,vocal,trainer,organ,stronger,volumes,advances,lemon,toxic,darkness,bizrate,vienna,implied,stanford,packing,statute,rejected,satisfy,shelter,chapel,gamespot,layers,guided,bahamas,powell,mixture,bench,rider,radius,logging,hampton,borders,butts,bobby,sheep,railroad,lectures,wines,nursery,harder,cheapest,travesti,stuart,salvador,salad,monroe,tender,paste,clouds,tanzania,preserve,unsigned,staying,easter,theories,praise,jeremy,venice,estonia,veteran,streams,landing,signing,executed,katie,showcase,integral,relax,namibia,synopsis,hardly,prairie,reunion,composer,sword,absent,sells,ecuador,hoping,accessed,spirits,coral,pixel,float,colin,imported,paths,bubble,acquire,contrary,tribune,vessel,acids,focusing,viruses,cheaper,admitted,dairy,admit,fancy,equality,samoa,stickers,leasing,lauren,beliefs,squad,analyze,ashley,scroll,relate,wages,suffer,forests,invalid,concerts,martial,males,retain,execute,tunnel,genres,cambodia,patents,chaos,wheat,beaver,updating,readings,kijiji,confused,compiler,eagles,bases,accused,unity,bride,defines,airports,begun,brunette,packets,anchor,socks,parade,trigger,gathered,essex,slovenia,notified,beaches,folders,dramatic,surfaces,terrible,routers,pendant,dresses,baptist,hiring,clocks,females,wallace,reflects,taxation,fever,cuisine,surely,myspace,theorem,stylus,drums,arnold,chicks,cattle,radical,rover,treasure,reload,flame,levitra,tanks,assuming,monetary,elderly,floating,bolivia,spell,hottest,stevens,kuwait,emily,alleged,compile,webster,struck,plymouth,warnings,bridal,annex,tribal,curious,freight,rebate,meetup,eclipse,sudan,shuttle,stunning,cycles,affects,detect,actively,ampland,fastest,butler,injured,payroll,cookbook,courier,uploaded,hints,collapse,americas,unlikely,techno,beverage,tribute,wired,elvis,immune,latvia,forestry,barriers,rarely,infected,martha,genesis,barrier,argue,trains,metals,bicycle,letting,arise,celtic,thereby,jamie,particle,minerals,advise,humidity,bottles,boxing,bangkok,hughes,jeffrey,chess,operates,brisbane,survive,oscar,menus,reveal,canal,amino,herbs,clinics,manitoba,missions,watson,lying,costumes,strict,saddam,drill,offense,bryan,protest,hobby,tries,nickname,inline,washing,staffing,trick,enquiry,closure,timber,intense,playlist,showers,ruling,steady,statutes,myers,drops,wider,plugins,enrolled,sensors,screw,publicly,hourly,blame,geneva,freebsd,reseller,handed,suffered,intake,informal,tucson,heavily,swingers,fifty,headers,mistakes,uncle,defining,counting,assure,devoted,jacob,sodium,randy,hormone,timothy,brick,naval,medieval,bridges,captured,thehun,decent,casting,dayton,shortly,cameron,carlos,donna,andreas,warrior,diploma,cabin,innocent,scanning,valium,copying,cordless,patricia,eddie,uganda,fired,trivia,adidas,perth,grammar,syria,disagree,klein,harvey,tires,hazard,retro,gregory,episodes,boolean,circular,anger,mainland,suits,chances,interact,bizarre,glenn,auckland,olympics,fruits,ribbon,startup,suzuki,trinidad,kissing,handy,exempt,crops,reduces,geometry,slovakia,guild,gorgeous,capitol,dishes,barbados,chrysler,nervous,refuse,extends,mcdonald,replica,plumbing,brussels,tribe,trades,superb,trinity,handled,legends,floors,exhaust,shanghai,speaks,burton,davidson,copied,scotia,farming,gibson,roller,batch,organize,alter,nicole,latino,ghana,edges,mixing,handles,skilled,fitted,harmony,asthma,twins,triangle,amend,oriental,reward,windsor,zambia,hydrogen,webshots,sprint,chick,advocate,inputs,genome,escorts,thong,medal,coaches,vessels,walks,knives,arrange,artistic,honors,booth,indie,unified,bones,breed,detector,ignored,polar,fallen,precise,sussex,msgid,invoice,gather,backed,alfred,colonial,carey,motels,forming,embassy,danny,rebecca,slight,proceeds,indirect,amongst,msgstr,arrest,adipex,horizon,deeply,toolbox,marina,prizes,bosnia,browsers,patio,surfing,lloyd,optics,pursue,overcome,attract,brighton,beans,ellis,disable,snake,succeed,leonard,lending,reminder,searched,plains,raymond,insights,sullivan,midwest,karaoke,lonely,hereby,observe,julia,berry,collar,racial,bermuda,amanda,mobiles,kelkoo,exhibits,terrace,bacteria,replied,seafood,novels,ought,safely,finite,kidney,fixes,sends,durable,mazda,allied,throws,moisture,roster,symantec,spencer,wichita,nasdaq,uruguay,timer,tablets,tuning,gotten,tyler,futures,verse,highs,wanting,custody,scratch,launches,ellen,rocket,bullet,towers,racks,nasty,latitude,tumor,deposits,beverly,mistress,trustees,watts,duncan,reprints,bernard,forty,tubes,midlands,priest,floyd,ronald,analysts,queue,trance,locale,nicholas,bundle,hammer,invasion,runner,notion,skins,mailed,fujitsu,spelling,arctic,exams,rewards,beneath,defend,medicaid,infrared,seventh,welsh,belly,quarters,stolen,soonest,haiti,naturals,lenders,fitting,fixtures,bloggers,agrees,surplus,elder,sonic,cheers,belarus,zoning,gravity,thumb,guitars,essence,flooring,ethiopia,mighty,athletes,humanity,holmes,scholars,galaxy,chester,snapshot,caring,segments,dominant,twist,itunes,stomach,buried,newbie,minimize,darwin,ranks,debut,bradley,anatomy,fraction,defects,milton,marker,clarity,sandra,adelaide,monaco,settled,folding,emirates,airfare,vaccine,belize,promised,volvo,penny,robust,bookings,minolta,porter,jungle,ivory,alpine,andale,fabulous,remix,alias,newer,spice,implies,cooler,maritime,periodic,overhead,ascii,prospect,shipment,breeding,donor,tension,trash,shapes,manor,envelope,diane,homeland,excluded,andrea,breeds,rapids,disco,bailey,endif,emotions,incoming,lexmark,cleaners,eternal,cashiers,rotation,eugene,metric,minus,bennett,hotmail,joshua,armenia,varied,grande,closest,actress,assign,tigers,aurora,slides,milan,premiere,lender,villages,shade,chorus,rhythm,digit,argued,dietary,symphony,clarke,sudden,marilyn,lions,findlaw,pools,lyric,claire,speeds,matched,carroll,rational,fighters,chambers,warming,vocals,fountain,chubby,grave,burner,finnish,gentle,deeper,muslims,footage,howto,worthy,reveals,saints,carries,devon,helena,saves,regarded,marion,lobby,egyptian,tunisia,outlined,headline,treating,punch,gotta,cowboy,bahrain,enormous,karma,consist,betty,queens,lucas,tribes,defeat,clicks,honduras,naughty,hazards,insured,harper,mardi,tenant,cabinets,tattoo,shake,algebra,shadows,holly,silly,mercy,hartford,freely,marcus,sunrise,wrapping,weblogs,timeline,belongs,readily,fence,nudist,infinite,diana,ensures,lindsay,legally,shame,civilian,fatal,remedy,realtors,briefly,genius,fighter,flesh,retreat,adapted,barely,wherever,estates,democrat,borough,failing,retained,pamela,andrews,marble,jesse,logitech,surrey,briefing,belkin,highland,modular,brandon,giants,balloon,winston,solved,hawaiian,gratuit,consoles,qatar,magnet,porsche,cayman,jaguar,sheer,posing,hopkins,urgent,infants,gothic,cylinder,witch,cohen,puppy,kathy,graphs,surround,revenge,expires,enemies,finances,accepts,enjoying,patrol,smell,italiano,carnival,roughly,sticker,promises,divide,cornell,satin,deserve,mailto,promo,worried,tunes,garbage,combines,bradford,phrases,chelsea,boring,reynolds,speeches,reaches,schema,catalogs,quizzes,prefix,lucia,savannah,barrel,typing,nerve,planets,deficit,boulder,pointing,renew,coupled,myanmar,metadata,harold,circuits,floppy,texture,handbags,somerset,incurred,antigua,thunder,caution,locks,namely,euros,pirates,aerial,rebel,origins,hired,makeup,textile,nathan,tobago,indexes,hindu,licking,markers,weights,albania,lasting,wicked,kills,roommate,webcams,pushed,slope,reggae,failures,surname,theology,nails,evident,whats,rides,rehab,saturn,allergy,twisted,merit,enzyme,zshops,planes,edmonton,tackle,disks,condo,pokemon,ambien,retrieve,vernon,worldcat,titanium,fairy,builds,shaft,leslie,casio,deutsche,postings,kitty,drain,monte,fires,algeria,blessed,cardiff,cornwall,favors,potato,panic,sticks,leone,excuse,reforms,basement,onion,strand,sandwich,lawsuit,cheque,banners,reject,circles,italic,beats,merry,scuba,passive,valued,courage,verde,gazette,hitachi,batman,hearings,coleman,anaheim,textbook,dried,luther,frontier,settle,stopping,refugees,knights,palmer,derby,peaceful,altered,pontiac,doctrine,scenic,trainers,sewing,conclude,munich,celebs,propose,lighter,advisors,pavilion,tactics,trusts,talented,annie,pillow,derek,shorter,harley,relying,finals,paraguay,steal,parcel,refined,fifteen,fears,predict,boutique,acrylic,rolled,tuner,peterson,shannon,toddler,flavor,alike,homeless,horrible,hungry,metallic,blocked,warriors,cadillac,malawi,sagem,curtis,parental,strikes,lesser,marathon,pressing,gasoline,dressed,scout,belfast,dealt,niagara,warcraft,charms,catalyst,trader,bucks,denial,thrown,prepaid,raises,electro,badge,wrist,analyzed,heath,ballot,lexus,varying,remedies,validity,trustee,weighted,angola,performs,plastics,realm,jenny,helmet,salaries,postcard,elephant,yemen,tsunami,scholar,nickel,buses,expedia,geology,coating,wallet,cleared,smilies,boating,drainage,shakira,corners,broader,rouge,yeast,clearing,coated,intend,louise,kenny,routines,hitting,yukon,beings,aquatic,reliance,habits,striking,podcasts,singh,gilbert,ferrari,brook,outputs,ensemble,insulin,assured,biblical,accent,mysimon,eleven,wives,ambient,utilize,mileage,prostate,adaptor,auburn,unlock,hyundai,pledge,vampire,angela,relates,nitrogen,xerox,merger,softball,firewire,nextel,framing,musician,blocking,rwanda,sorts,vsnet,limiting,dispatch,papua,restored,armor,riders,chargers,remark,dozens,varies,rendered,picking,guards,openings,councils,kruger,pockets,granny,viral,inquire,pipes,laden,aruba,cottages,realtor,merge,edgar,develops,chassis,dubai,pushing,fleece,pierce,allan,dressing,sperm,filme,craps,frost,sally,yacht,tracy,prefers,drilling,breach,whale,tomatoes,bedford,mustang,clusters,antibody,momentum,wiring,pastor,calvin,shark,phases,grateful,emerald,laughing,grows,cliff,tract,ballet,abraham,bumper,webpage,garlic,hostels,shine,senegal,banned,wendy,briefs,diffs,mumbai,ozone,radios,tariff,nvidia,opponent,pasta,muscles,serum,wrapped,swift,runtime,inbox,focal,distant,decimal,propecia,samba,hostel,employ,mongolia,penguin,magical,miracle,manually,reprint,centered,yearly,wound,belle,writings,hamburg,cindy,fathers,charging,marvel,lined,petite,terrain,strips,gossip,rangers,rotary,discrete,beginner,boxed,cubic,sapphire,kinase,skirts,crawford,labeled,marking,serbia,sheriff,griffin,declined,guyana,spies,neighbor,elect,highways,thinkpad,intimate,preston,deadly,bunny,chevy,rounds,longest,tions,dentists,flyer,dosage,variance,cameroon,baking,adaptive,computed,needle,baths,brakes,nirvana,invision,sticky,destiny,generous,madness,emacs,climb,blowing,heated,jackie,sparc,cardiac,dover,adrian,vatican,brutal,learners,token,seekers,yields,suited,numeric,skating,kinda,aberdeen,emperor,dylan,belts,blacks,educated,rebates,burke,proudly,inserted,pulling,basename,obesity,curves,suburban,touring,clara,vertex,tomato,andorra,expired,travels,flush,waiver,hayes,delight,survivor,garcia,cingular,moses,counted,declare,johns,valves,impaired,donors,jewel,teddy,teaches,ventures,bufing,stranger,tragedy,julian,dryer,painful,velvet,tribunal,ruled,pensions,prayers,funky,nowhere,joins,wesley,lately,scary,mattress,mpegs,brunei,likewise,banana,slovak,cakes,mixer,remind,sbjct,charming,tooth,annoying,stays,disclose,affair,drove,washer,upset,restrict,springer,beside,mines,rebound,logan,mentor,fought,baghdad,metres,pencil,freeze,titled,sphere,ratios,concord,endorsed,walnut,lance,ladder,italia,liberia,sherman,maximize,hansen,senators,workout,bleeding,colon,lanes,purse,optimize,stating,caroline,align,bless,engaging,crest,triumph,welding,deferred,alloy,condos,plots,polished,gently,tulsa,locking,casey,draws,fridge,blanket,bloom,simpsons,elliott,fraser,justify,blades,loops,surge,trauma,tahoe,advert,possess,flashers,subaru,vanilla,picnic,souls,arrivals,spank,hollow,vault,securely,fioricet,groove,pursuit,wires,mails,backing,sleeps,blake,travis,endless,figured,orbit,niger,bacon,heater,colony,cannon,circus,promoted,forbes,moldova,paxil,spine,trout,enclosed,cooked,thriller,transmit,apnic,fatty,gerald,pressed,scanned,hunger,mariah,joyce,surgeon,cement,planners,disputes,textiles,missile,intranet,closes,deborah,marco,assists,gabriel,auditor,aquarium,violin,prophet,bracket,isaac,oxide,naples,promptly,modems,harmful,prozac,sexually,dividend,newark,glucose,phantom,playback,turtle,warned,neural,fossil,hometown,badly,apollo,persian,handmade,greene,robots,grenada,scoop,earning,mailman,sanyo,nested,somalia,movers,verbal,blink,carlo,workflow,novelty,bryant,tiles,voyuer,switched,tamil,garmin,fuzzy,grams,richards,budgets,toolkit,render,carmen,hardwood,erotica,temporal,forge,dense,brave,awful,airplane,istanbul,impose,viewers,asbestos,meyer,enters,savage,willow,resumes,throwing,existed,wagon,barbie,knock,potatoes,thorough,peers,roland,optimum,quilt,creature,mounts,syracuse,refresh,webcast,michel,subtle,notre,maldives,stripes,firmware,shepherd,canberra,cradle,mambo,flour,sympathy,choir,avoiding,blond,expects,jumping,fabrics,polymer,hygiene,poultry,virtue,burst,surgeons,bouquet,promotes,mandate,wiley,corpus,johnston,fibre,shades,indices,adware,zoloft,prisoner,daisy,halifax,ultram,cursor,earliest,donated,stuffed,insects,crude,morrison,maiden,examines,viking,myrtle,bored,cleanup,bother,budapest,knitting,attacked,bhutan,mating,compute,redhead,arrives,tractor,allah,unwrap,fares,resist,hoped,safer,wagner,touched,cologne,wishing,ranger,smallest,newman,marsh,ricky,scared,theta,monsters,asylum,lightbox,robbie,stake,cocktail,outlets,arbor,poison'.split(',');

//how many words do we put together in a single search to make each search more dynamic
const wordSearchTotal = 2;

//our desktop browser will have specific dimensions
const desktopWidth = 1280;
const desktopHeight = 800;

//what is our account name? used to verify login
const accountName = 'account name';

//track the time we started this process
const timeStart = new Date().getTime();

//if true, we will hide the browser gui
const headless = false;

//our browser reference object
var browser;

/**
 * Main functionality starts here
 */
exports.runAgent = async (req, res) => {
	
	//obtain the keyId from the query string
	const keyId = req.query.keyId;

	//what are we trying to update
	const target = req.query.target;
	
	//notify the key provided
	console.log("Key provided: " + keyId);

	//make sure correct key specified to invoke function
	if (keyId != null && keyId.length > 5 && keyId == process.env.keyId) {

		//print valid key id
		console.log("Key Id valid");

		//what are we trying to do
		if (target != null) {
			
			if (target == 'desktop') {
				performSearch(false, res);
			} else if (target == 'mobile') {
				performSearch(true, res);
			} else if (target == 'bonus') {
				bonusLinks();
			} else {
				console.log('Invalid target provided: ' + target);
				res.status(200).send('Done');
			}
			
		} else {
			
			console.log('Invalid target provided');
			res.status(500).send('Done');
			
		}			
		
	} else {
		
		//someone tried to access without a valid key
		console.log("Invalid key provided");
		res.status(200).send('Done');
	}
};

async function bonusLinks() {
	
	try {
	
		//perform login
		const page = await login(false);
		
		//start tracing
		await page.tracing.start({path: 'trace.json', categories: ['devtools.timeline']});

		//open rewards page and query our links
		console.log('opening rewards page');
		await page.goto(urlRewards, { timeout: loadWebPageTimeout });

		//wait for page for a short amount of time
		await page.waitFor(wait);
		await page.waitFor(wait);
		await page.waitFor(wait);
		
		console.log('searching for <a> links');
		const anchors = await page.$$('a');
		
		//wait for page for a short amount of time
		await page.waitFor(wait);
		
		//remember how many links we have to click
		const count = anchors.length;
		
		console.log('There are ' + count + ' links on this page');
		
		//click every link
		for (var index = 0; index < count; index++) {
			
			try {
				
				//navigate back to the rewards page
				console.log('opening rewards page');
				await page.goto(urlRewards, { timeout: loadWebPageTimeout });
				
				//wait for page for a short amount of time
				await page.waitFor(wait);
				await page.waitFor(wait);
				await page.waitFor(wait);
				
				console.log('searching for <a> links');
				
				//load the links from the page
				const anchors = await page.$$('a');
				
				//wait for page for a short amount of time
				await page.waitFor(wait);
				
				//look for the next valid url here to save time
				for (var x = index; x < count; x++) {
					
					//update the index so we aren't checking the same elements
					index = x;
					
					//get the text of the link
					const anchorText = await (await anchors[index].getProperty('textContent')).jsonValue();
					const className = await (await anchors[index].getProperty('className')).jsonValue();
					
					//to be a valid link you need this class name
					if (className.toLowerCase().indexOf("c-call-to-action") < 0)
						continue;
					
					//to be a valid link there has to be text
					if (anchorText == null || anchorText.length < 1)
						continue;
					
					//to be a valid link it can't contain the text 'remove'
					if (anchorText.toLowerCase().indexOf("remove") > -1)
						continue;
					
					//to be a valid link it can't contain the text 'redeem'
					if (anchorText.toLowerCase().indexOf("redeem") > -1)
						continue;
									
					try {
						
						//display progress and text info
						console.log('index - ' + index);
						console.log('class - ' + className);
						console.log('anchorText - ' + anchorText);
											
						//get the text of the link
						console.log('clicking link ' + (index + 1) + ' of ' + count + ' "' + anchorText + '"');
						
						//click on the next link
						await anchors[index].click();
						
						//wait for page for a short amount of time
						await page.waitFor(wait);
			
						//display that we were successful
						console.log('link ' + (index + 1) + ' clicked');
						
					} catch (error) {
						
						console.log(error);
						
					} finally {
						
						//exit the loop
						break;
					}
				}
				
			} catch (error) {
				console.log('link ' + index + ' not accessible');
			}
		}
		
		//email point summary
		await emailPointSummary(page, 'bonus');
		
	} catch (e) {
		
		throw new Error(e);
		
	} finally {
		
		try {
			
			//in the event of an error we want to still close the browser for good measure
			await browser.close();
			
		} catch (er) {
			console.log(er);
		}
	}
}

async function performSearch(mobile, res) {
		
	try {
		
		//perform login
		const page = await login(mobile);
		
		console.log('opening home page');
		
		//open home page again
		await page.goto(urlHomePage, { timeout: loadWebPageTimeout });
		
		//wait for page for a short amount of time
		await page.waitFor(wait);

		//how many searches do we perform
		const searchLimit = (mobile) ? searchLimitMobile : searchLimitDesktop;
		
		//now let's start performing our searches to earn points
		for (var i = 1; i <= searchLimit; i++) {
			
			console.log('Searching... ' + i + ' of ' + searchLimit);
			
			try {
				//perform the search
				await page.goto(util.format(urlSearch, getRandomSearchWord()), { timeout: loadWebPageTimeout });
			} catch (er1) {
				console.log(er1);
			}
			
			//wait for page for a short amount of time
			await page.waitFor(wait);
			
			console.log('opening home page');
			
			try {
				//open home page again
				await page.goto(urlHomePage, { timeout: loadWebPageTimeout });
			} catch (er2) {
				console.log(er2);
			}
			
			//wait for page for a short amount of time
			await page.waitFor(wait);
		}
		
		//email point summary
		await emailPointSummary(page, (mobile) ? 'mobile' : 'desktop');
		
		res.status(200).send('Done');
		
	} catch (e) {
		
		res.status(500).send('Done');
		
		throw new Error(e);
		
	} finally {
		
		try {
			
			//in the event of an error we want to still close the browser for good measure
			await browser.close();
			
		} catch (er) {
			console.log(er);
		}
	}
}

function getRandomSearchWord() {
	
	console.log('word array size - ' + words.length);
	
	var result = '';
	
	for (var i = 0; i < wordSearchTotal; i++) {
		
		if (i != 0)
			result += '+';
				
		//pick a random word from our list
		var index = parseInt(Math.random() * words.length);
		
		//combine the word together in our search result
		result += words[index];
		
		//remove word from the array list so we don't pick it again
		words.splice(index, 1);
	}
	
	console.log('search word - ' + result);
	
	return result;
}

function sendEmail(emailSubject, emailBody) {
	
	//if we don't have info provided we can't send an email
	if (usernameMail == null || usernameMail.length < 5)
		return;
	if (passwordMail == null || passwordMail.length < 5)
		return;
	if (emailNotify == null || emailNotify.length < 5)
		return;
	
	var transporter = nodemailer.createTransport({
		
		service: 'gmail',
		auth: {
			user: usernameMail,
			pass: passwordMail
		}
		
	});

	var mailOptions = {
		from: usernameMail,
		to: emailNotify,
		subject: emailSubject,
		text: emailBody
	};

	console.log('sending email');
	
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

async function getBrowserPage(mobile) {

	var page;
	
	//how many attempts to open the browser
	var count = 0;
	
	//here we will continue to create the browser because of anonymous error on google cloud where the web socket is not ready
	while (true) {
		
		//keep track how many times we try to open the browser
		count = count + 1;
		
		try {
			
			console.log('opening browser attempt ' + count);
			browser = await puppeteer.launch({args: ['--no-sandbox'], headless: headless});
				
			//access the page we will be using to browse
			page = await browser.newPage();
			
			if (mobile) {
				console.log('User agent: ' + userAgentMobile);
				await page.setUserAgent(userAgentMobile);
			} else {
				console.log('User agent: ' + userAgentDesktop);
				await page.setUserAgent(userAgentDesktop);
			}
		
			await page.setViewport({ width: desktopWidth, height: desktopHeight });
			
			//if we made it this far we can exit the loop
			break;
			
		} catch (error) {
			console.log(error);
		}
	}
	
	//return our page
	return page;
}

async function verifyLogin(page, mobile) {
	
	try {
		
		console.log('verifying login');
		
		//opening home page
		await page.goto(urlHomePage, { timeout: loadWebPageTimeout });
		
		//the text we find for comparison
		var accountNameTag;
		
		//the way we verify is different for mobile and desktop
		if (!mobile) {
			
			//tag containing account name
			accountNameTag = '#id_n';
			
		} else {
			
			//wait for page for a short amount of time
			await page.waitFor(wait);
			await page.waitFor(wait);
			
			//click hamburger menu
			await page.waitForSelector('#mHamburger');
			await page.click('#mHamburger');
			
			//wait for page for a short amount of time
			await page.waitFor(wait);
			await page.waitFor(wait);
			
			
			//tag containing account name
			accountNameTag = '#hb_n';
		}

		console.log('checking for account name to ensure we are logged in');
		await page.waitForSelector(accountNameTag);
		const element = await page.$(accountNameTag);
		const text = await (await element.getProperty('textContent')).jsonValue();
		
		//if account name is on the page we logged in successfully
		if (text == accountName) {
			console.log('we are logged in');
			return true;
		} else {
			console.log('Text not found for account name: "' + text + '"');
		}
		
	} catch (error) {
		console.log(error);
	}
	
	//we couldn't verify that we are logged in
	console.log('not logged in');
	return false;
}

async function login(mobile) {
	
	const page = await getBrowserPage(mobile);
	
	//were we successful loading cookies?
	var resultCookie = false;
	
	//were we successful verifying the login?
	var resultVerifyLogin = false;
	
	//load our cookies (if they exist)
	resultCookie = await loadCookies(page, mobile);
	
	//if we were able to load our cookies, check if we are logged in
	if (resultCookie)
		resultVerifyLogin = await verifyLogin(page, mobile);
	
	//if we have verified login no need to continue
	if (resultVerifyLogin)
		return page;
	
	try {
		
		console.log('opening home page');
		
		//go to the homepage
		const response = await page.goto(urlHomePage, { timeout: loadWebPageTimeout });
		
		//wait for page for a short amount of time
		await page.waitFor(wait);
		await page.waitFor(wait);
      	await page.waitFor(wait);
							
		//now navigate to the login
		if (mobile) {
			
			console.log('closing promo banner');
			
			try {
				
				//close the promotion banner that appears
				await page.waitForSelector('.rms_img');
				await page.click('.rms_img');
				
			} catch (error) {
				
				//sometimes the banner is not there and we don't want the app to crash
				console.log(error);
				console.log('that\'s ok we can still continue');
			}
				
			//wait for page for a short amount of time
			await page.waitFor(wait);
          	await page.waitFor(wait);
          	await page.waitFor(wait);
			
			console.log('clicking hamburger menu');
			
			//click hamburger menu
			await page.waitForSelector('#mHamburger');
			await page.click('#mHamburger');
			
			//wait for page for a short amount of time
			await page.waitFor(wait);
			
			console.log('clicking sign in');
			
			//click sign in
			await page.waitForSelector('#hb_a');
			await page.click('#hb_a');
			
			//wait for page for a short amount of time
			await page.waitFor(wait);
			
		} else {
			
			console.log('click the login button');

			//click login
			await page.waitForSelector('.id_button');
			await page.click('.id_button');

			//wait for page for a short amount of time
			await page.waitFor(wait);
		}
		
		console.log('entering username');
		
		//entering user name
		await page.waitForSelector('#i0116');
		await page.type('#i0116', username);
		
		//wait for page for a short amount of time
		await page.waitFor(wait);
		
		//click next
		await page.waitForSelector('#idSIButton9');
		await page.click('#idSIButton9');
					
		//wait for page for a short amount of time
		await page.waitFor(wait);
		
		console.log('entering password');
		
		//enter password
		await page.waitForSelector('#i0118');
		await page.type('#i0118', password);
		
		//wait for page for a short amount of time
		await page.waitFor(wait);
		
		console.log('clicking sign in');
		
		//finally we can login now
		await page.waitForSelector('#idSIButton9');
		await page.click('#idSIButton9');
		
		//wait for page for a short amount of time
		await page.waitFor(wait);
		
		//verify we are logged in
		var result = await verifyLogin(page, mobile);
		
		//if we aren't logged in, throw error
		if (!result) {
			
			//at this point we should have been logged in
			throw new Error('Couldn\'t verify login');
			
		} else {
			
			//get all cookies and save them for future use
			const cookies = await page.cookies();
			console.log(cookies);
			await saveCookies(JSON.stringify(cookies), mobile);
		}
		
	} catch(error) {
		
		//what is the error
		console.log(error);
		
		//if login failed we can't continue
		return null;
	}
	
	return page;
}

async function emailPointSummary(page, platform) {
	
	try {
		
		//track the time this process ended
		const timeEnd = new Date().getTime();

		//how many seconds did it take
		const seconds = (timeEnd - timeStart) / 1000;
		
		//text description of the duration
		var durationDesc = 'done in ' + seconds + ' seconds';
		
		//specify the platform
		durationDesc = platform + ' ' + durationDesc;
		
		//print time duration
		console.log(durationDesc);
	
		//in order to access our points we need to spoof the desktop browser
		await page.setUserAgent(userAgentDesktop);
		
		//open home page again			
		await page.goto(urlHomePage, { timeout: loadWebPageTimeout });
		
		//wait for page for a short amount of time
		await page.waitFor(wait);
		await page.waitFor(wait);
		await page.waitFor(wait);
		
		//parsing the points isn't required but we would like to know it
		console.log('parsing points');
		await page.waitForSelector(pointsContainerDesktop);
		const element = await page.$(pointsContainerDesktop);
		const text = await page.evaluate(element => element.textContent, element);
		console.log('points: ' + text);
		
		//wait for page for a short amount of time
		await page.waitFor(wait);
		
		//send an email update
		sendEmail('Bing Points: ' + text, durationDesc);
		
	} catch (error) {
		console.log(error);
	}
}

//load our cookie information (if exists)
async function loadCookies(page, mobile) {
	
	//load file data if it exists
	console.log('loading cookies');
		
	//determine which cookie Id we are using
	var cookieId = (mobile) ? cookieIdMobile : cookieIdDesktop;
	console.log('cookieId: ' + cookieId);
	
	//query the table and return the results in our snapshot
	var snapshot = await firestore.collection(cookieTableName).where('id', '==', cookieId).get();
	
	//make sure our objects are not null and has 1 result as expected
	if (snapshot != null && snapshot.docs != null && snapshot.docs.length == 1) {
		
		console.log('parsing cookies');
		
		//read text from db and parse to json array
		var tmpCookies = JSON.parse(snapshot.docs[0].data().cookieData);
		
		//inject each cookie into our browser page
		for (var i = 0; i < tmpCookies.length; i++) {
			console.log('injecting cookie - ' + tmpCookies[i].name);
			await page.setCookie(tmpCookies[i]);
		}
		
		//success
		return true;
		
	} else {
		console.log('cookies not found');
	}
	
	//we weren't successful loading cookies
	return false;
}

//here we will add / update the cookies
async function saveCookies(cookieData, mobile) {
	
	console.log('Saving cookies');
	
	try {
		
		//determine which cookie Id we are using
		var cookieId = (mobile) ? cookieIdMobile : cookieIdDesktop;
		console.log('cookieId: ' + cookieId);		
		
		//reference our cookie document
		const cookieRef = firestore.collection(cookieTableName);
		
		//query the table and return the results in our snapshot
		var snapshot = await cookieRef.where('id', '==', cookieId).get();
		
		if (snapshot.docs.length < 1) {
			
			//if there are no results we will add
			var result = await cookieRef.add({id: cookieId, cookieData: cookieData});
			console.log(result);
			console.log('Cookie(s) added to db - ' + cookieId);
			
		} else {
			
			//if cookies already exist we will update
			var result = await cookieRef.doc(snapshot.docs[0].id).update({cookieData: cookieData});
			console.log(result);
			console.log('Cookie(s) updated in db - ' + cookieId);
		}
		
		//return success
		return true;
		
	} catch (error) {
		
		console.log(error);
		
		//no success
		return false;
	}
}

//test functions below
bonusLinks();
performSearch(false, null);
performSearch(true, null);
sendEmail('custom subject', 'custom text');
//console.log('taking screenshot');
//await page.screenshot({ path: 'myscreenshot-' + new Date().getTime() + '.png', fullPage: true });
