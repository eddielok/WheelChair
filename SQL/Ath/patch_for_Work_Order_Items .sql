use WheelChair; 
 
if not exists(select 1 from [dbo].Work_Order_Items )
  begin
     alter table [dbo].Work_Order_Items 
     drop column Completion_Date; 
	 
	 alter table [dbo].Work_Order_Items 
     add temp_completionDate datetime null;
  end
else
  begin 
     --   there is existing data in the db , use tmp column -> add -> remove strategy 
     alter table [dbo].Work_Order_Items 
     add temp_completionDate datetime null;
     
     update [dbo].Work_Order_Items set temp_completionDate = Completion_Date;
     
     alter table [dbo].Work_Order_Items 
     drop column Completion_Date;  
     
     alter table [dbo].Work_Order_Items 
     add Completion_Date datetime null;
     
     update [dbo].Work_Order_Items set Completion_Date = temp_completionDate;
     
     alter table [dbo].Work_Order_Items 
     drop column temp_completionDate; 
  end
  


