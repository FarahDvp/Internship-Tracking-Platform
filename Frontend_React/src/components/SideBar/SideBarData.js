import React from 'react'
import EventIcon from '@mui/icons-material/Event';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CreateIcon from '@mui/icons-material/Create';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ForumIcon from '@mui/icons-material/Forum';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HttpsIcon from '@mui/icons-material/Https';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
export  const SideBarData= [

    {
        title :"Lister Etudiants" ,
        icon : <FormatListBulletedIcon/>,
        link: '/getalletudiant',
        roles: ['responsable','admin']
    },
    {
        title :"Lister Events" ,
        icon : <EventIcon/>,
        link: '/Events',
        roles: ['responsable','admin','etudiant','alumni']
    }
    ,
    {
        title :"Lister Pfa" ,
        icon : <FormatListNumberedRtlIcon/>,
        link: '/getallpfa',
        roles: ['admin']
    },
    {
        title :"Choisir PFA" ,
        icon : <FormatListBulletedIcon/>,
        link: '/choose_pfa',
        roles: ['etudiant']
    },
    {
        title :"Créer Event" ,
        icon : <AddIcon/>,
        link: '/newEvent',
        roles: ['responsable','admin']
    },
    {
        title :"Lister Enseignants" ,
        icon : <FormatListNumberedRtlIcon/>,
        link: '/enseignants',
        roles: ['responsable','admin']
    },
    {
        title :"Voir Status" ,
        icon : <CheckCircleIcon/>,
        link: '/alumnistatus',
        roles: ['alumni','alumni-unverified','alumni-refused']
    },
    {
        title :"Valider Alumni" ,
        icon : <UnpublishedIcon/>,
        link: '/getunverified',
        roles: ['admin']
    },
    {
        title :"Insérer Stage" ,
        icon : <CreateIcon/>,
        link: '/insertstage',
        roles: ['responsable','enseignant','admin']
    },
    {
        title :"Insérer PFE" ,
        icon : <CreateIcon/>,
        link: '/insertpfe',
        roles: ['responsable','enseignant','admin']
    },
    {
        title :"Ajouter Enseignant" ,
        icon : <CreateIcon/>,
        link: '/NewEnseignant',
        roles: ['responsable','enseignant','admin']
    },
    {
        title :"Lister Etudiants" ,
        icon : <FormatListNumberedRtlIcon/>,
        link: '/getetudiant',
        roles: ['responsable','enseignant','admin']
    },
    {
        title :"Modifier Etudiant" ,
        icon : <SyncAltIcon/>,
        link: '/modifyetudiants',
        roles: ['responsable','enseignant','admin']
    },
    {
        title :"Ajouter Etudiant" ,
        icon : <AddCircleIcon/>,
        link: '/ajouteretudiant',
        roles: ['admin']
    },
    {
        title :"Changer Mot De Passe" ,
        icon : <HttpsIcon/>,
        link: '/passreset',
        roles: ['responsable','enseignant','admin','etudiant','alumni','alumni-unverified']
    },
    {
        title :"Lister Pfe" ,
        icon : <FormatListNumberedRtlIcon/>,
        link: '/getpfe',
        roles: ['admin']
    },
    {
        title :"Mes Pfa" ,
        icon : <FormatListNumberedRtlIcon/>,
        link: '/getallenseignantpfa',
        roles: ['enseignant']
    },
    {
        title :"Mes Pfe" ,
        icon : <FormatListNumberedRtlIcon/>,
        link: '/getpfeenseignant',
        roles: ['enseignant']
    },
    {
        title :"Pfe Stats" ,
        icon : <EqualizerIcon/>,
        link: '/getpfeStats',
        roles: ['admin']
    },
    {
        title :"Dashboard" ,
        icon : <DashboardIcon/>,
        link: '/enseignantdashboard',
        roles: ['enseignant']
    },
    {
        title :"Lister Vacations" ,
        icon : <ListAltIcon/>,
        link: '/vacations',
        roles: ['admin']
    },
    {
        title :"Lister Contrats" ,
        icon : <ListAltIcon/>,
        link: '/contrats',
        roles: ['admin']
    },
    {
        title :"Demander Vacations" ,
        icon : <PublishedWithChangesIcon/>,
        link: '/demandervacation',
        roles: ['alumni']
    },
    {
        title :"Demander Contrat" ,
        icon : <ContactPageIcon/>,
        link: '/demandercontratexpert',
        roles: ['alumni']
    },
    {
        title :"Alumni Stats" ,
        icon : <EqualizerIcon/>,
        link: '/generalstats',
        roles: ['admin']
    },
    {
        title :"Publications" ,
        icon : <ForumIcon/>,
        link: '/viewpublications',
        roles: ['etudiant','alumni']
    },
    {
        title :"My Publications" ,
        icon : <ChatBubbleIcon/>,
        link: '/mypublications',
        roles: ['alumni']
    },
    
]
