using MongoDB.Driver;

namespace AccountsAPI.Database
{
    public class MongoController
    {
        private string username;
        private string password;
        public MongoClient client { get; private set; }

        public MongoController(string username, string password)
        {
            this.username = username;
            this.password = password;

            InitializeMongoDB();
        }

        private void InitializeMongoDB()
        {
            Console.WriteLine("Connecting to Mongo DB");

            client = new MongoClient($"mongodb+srv://{username}:{password}@cluster0.atojt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

            Console.WriteLine("Connected to Mongo DB!");
        }
    }
}
