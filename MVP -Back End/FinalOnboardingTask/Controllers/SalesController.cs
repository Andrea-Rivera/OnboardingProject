using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinalOnboardingTask.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace FinalOnboardingTask.Controllers
{
    public class SalesController : ApiController
    {

        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @" select 
                            dbo.Sales.SalesId,dbo.Customers.CustomerName as CustomerName, dbo.Products.ProductName as ProductName,  dbo.Stores.StoreName as StoreName, convert(varchar(10), DateSold, 120) as DateSold 
                            from dbo.Sales 
                            INNER JOIN dbo.Products ON dbo.Sales.ProductId = dbo.Products.ProductId
                            INNER JOIN dbo.Customers ON dbo.Sales.CustomerId = dbo.Customers.CustomerId
                            INNER JOIN dbo.Stores ON  dbo.Sales.StoreId= dbo.Stores.StoreId
                            ";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Sales sals)
        {
            try
            {
                DataTable table = new DataTable();

                string datesold = sals.DateSold.ToString().Split(' ')[0];
                string[] sa = datesold.Split('/');
                string strAdd = sa[2] + "-" + sa[1] + "-" + sa[0];

                string query = @" insert into dbo.Sales (ProductId, CustomerId, StoreId, DateSold) values (
                '" + sals.ProductId + @"'
                ,'" + sals.CustomerId + @"'
                  ,'" + sals.StoreId + @"'
                ,'" + strAdd + @"') ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Added Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }

        public string Put(Sales sals)
        {
            try
            {
                DataTable table = new DataTable();

                string datesold = sals.DateSold.ToString().Split(' ')[0];
                string[] sa = datesold.Split('/');
                string strNew = sa[2] + "-" + sa[1] + "-" + sa[0];

                string query = @" 
                update dbo.Sales set 
                ProductId = '" + sals.ProductId + @"'
                , CustomerId = '" + sals.CustomerId + @"' 
                 , StoreId = '" + sals.StoreId + @"' 
                 , DateSold = '" + strNew + @"' 
                where SalesId = " + sals.SalesId + @"                 
                ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Updated Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Update";
            }
        }

        public string Delete(Sales sals)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                delete from dbo.Sales 
                where SalesId = " + sals.SalesId + @"                 
                ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["FinalOnboardingTask"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Deleted Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Delete";
            }
        }

    }
}
