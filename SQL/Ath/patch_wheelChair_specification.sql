select wcPicLink, replace(wcPicLink, '#\\', '../') from Wheelchair_Specification  
select wcPicLink, replace(wcPicLink, '\', '/') from Wheelchair_Specification  
select wcPicLink, replace(wcPicLink, '#', '') from Wheelchair_Specification  

update Wheelchair_Specification set wcPicLink =  replace(wcPicLink, '#\\', '../') 
update Wheelchair_Specification set wcPicLink =  replace(wcPicLink, '\', '/') 
update Wheelchair_Specification set wcPicLink =   replace(wcPicLink, '#', '') 

update Wheelchair_Specification set catalogLink =  replace(wcPicLink, '#\\', '../') 
update Wheelchair_Specification set catalogLink =  replace(wcPicLink, '\', '/') 
update Wheelchair_Specification set catalogLink =   replace(wcPicLink, '#', '') 
