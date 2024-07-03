"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Select from 'react-select';
import { Line } from 'react-chartjs-2'; // Import Line from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'; // Import Chart.js components

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { ChatClient } from "@/components/chatbot/main-chat";

import { MessagesSquare    } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const HomePage = () => {
  const [date, setDate] = useState(new Date());
  const [buttonLabel1, setButtonLabel1] = useState("Teir");
  const [buttonLabel2, setButtonLabel2] = useState("Location");
  const [buttonLabel3, setButtonLabel3] = useState("Custom");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/items');
      const data = await response.json();
      setOptions(data);
    };

    fetchData();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/marble.png"), linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 150, 150, 0.8))',
    backgroundBlendMode: 'overlay',
    padding: '20px', // Ensure there's some padding around the edge
  };

  const wrapperStyle = {
    maxWidth: '600px', // Maximum width of the content area
    width: '100%', // Ensure the wrapper takes full width up to max width
    backgroundColor: 'white', // Optional: Set background color to ensure no "leakage"
    padding: '20px', // Padding inside the wrapper
    borderRadius: '8px', // Optional: Rounded corners for aesthetics
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Shadow for better visibility
  };

  const flexContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px', // Space between this container and the Tabs
  };

  const flexItemStyle = {
    marginRight: '20px', // Space between the "Open" button and the text box
  };

  const dropdownItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 8px', // Adjust padding to make items less thick
    fontSize: '14px', // Optional: Adjust font size if needed
  };

  const dropdownContentStyle = {
    width: '80px', // Adjust the width as needed
  };

  const invoices = [
    {
      Thetford: "231",
      Lymhurst: "213",
      Bridgewatch: "3213",
      FortSterling: "321",
    }
  ];

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <div style={flexContainerStyle}>
        <div style={{ flexGrow: 1, marginLeft: '10px' }}>
            <Select options={options} placeholder="Search an item..." />
          </div>        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account" style={{ width: '50%' }}>Notification</TabsTrigger>
            <TabsTrigger value="password" style={{ width: '50%' }}>History</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle>Notification</CardTitle>
                <CardDescription>
                  Recieve a notification when the items hits the selected amount.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <hr style={{ margin: '10px 0' }} />
                <Table>
                  <TableHeader>
                    <Label htmlFor="name">Current Prices</Label>

                    <TableRow>
                      <TableHead>Thetford</TableHead>
                      <TableHead>Lymhurst</TableHead>
                      <TableHead>Bridgewatch</TableHead>
                      <TableHead>Fort Sterling</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice, index) => (
                      <TableRow key={index}>
                        <TableCell>{invoice.Thetford}</TableCell>
                        <TableCell>{invoice.Lymhurst}</TableCell>
                        <TableCell>{invoice.Bridgewatch}</TableCell>
                        <TableCell>{invoice.FortSterling}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', width: '100%' }}>
                  <Button>Set reminder</Button>
                  <Input id="reminder-search" placeholder="Amount..." />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{buttonLabel2}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent style={dropdownContentStyle}>
                      <DropdownMenuLabel>Tier</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem style={dropdownItemStyle} onClick={() => setButtonLabel2("Thetford")}>
                        <span>Thetford</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem style={dropdownItemStyle} onClick={() => setButtonLabel2("Lymhurst")}>
                        <span>Lymhurst</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem style={dropdownItemStyle} onClick={() => setButtonLabel2("Bridgewatch")}>
                        <span>Bridgewatch</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem style={dropdownItemStyle} onClick={() => setButtonLabel2("Fort Sterling")}>
                        <span>Fort Sterling</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card className="bg-white text-black">
              <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>
                  Check previous prices and trends.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{buttonLabel2}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent style={dropdownContentStyle}>
                      <DropdownMenuLabel>Tier</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem style={dropdownItemStyle} onClick={() => setButtonLabel2("Thetford")}>
                        <span>Thetford</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem style={dropdownItemStyle} onClick={() => setButtonLabel2("Lymhurst")}>
                        <span>Lymhurst</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem style={dropdownItemStyle} onClick={() => setButtonLabel2("Bridgewatch")}>
                        <span>Bridgewatch</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem style={dropdownItemStyle} onClick={() => setButtonLabel2("Fort Sterling")}>
                        <span>Fort Sterling</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" style={{ flexGrow: 1, marginLeft: '165px' }}> 
                      1D
                    </Button>
                    <Button variant="outline" style={{ flexGrow: 1, marginLeft: '1px' }}>
                      7D
                    </Button> 
                    <Button variant="outline" style={{ flexGrow: 1, marginLeft: '1px'}}>
                      1M
                    </Button>
                    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          style={{ flexGrow: 1, marginLeft: '1px'}}
        >
 Custom
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
                </div>
              </CardContent>
              <CardFooter>
                <div style={{ width: '100%', height: '300px' }}>
                  <Line
                    data={{
                      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                      datasets: [
                        {
                          label: 'Price Trend',
                          data: [65, 59, 80, 81, 56, 55, 40],
                          fill: false,
                          backgroundColor: 'rgba(75,192,192,0.2)',
                          borderColor: 'rgba(75,192,192,1)',
                          tension: 0.1
                        }
                      ]
                    }}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-4 right-4">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger><MessagesSquare/></MenubarTrigger>
            <MenubarContent>
              <div className="h-full p-4 space-y-2">
                <ChatClient />
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar> 
      </div>
    </div>
  );
};

export default HomePage;
