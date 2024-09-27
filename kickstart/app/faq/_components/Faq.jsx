"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle } from "lucide-react";

// FAQ data
const faqs = [
  {
    question: "How do I create a new tournament?",
    answer: [
      "To create a new tournament, log in to your account and click on the 'Create Tournament' button on the dashboard. Fill in the required details such as tournament name, date, format, and number of participants. Once you've entered all the information, click 'Create' to set up your tournament.",
    ],
  },
  {
    question: "Can I edit tournament details after creation?",
    answer: [
      "Yes, you can edit most tournament details after creation. Go to the tournament page and click on the 'Edit' button. You can modify information such as tournament name, date, and format. However, some changes may be restricted once the tournament has started.",
    ],
  },
  {
    question: "How do I invite participants to my tournament?",
    answer: [
      "After creating your tournament, go to the tournament page and click on 'Invite Participants'. You can invite players by email or by sharing a unique tournament code. Participants can then use this code to join your tournament through the app.",
    ],
  },
  {
    question: "What tournament formats are supported?",
    answer: [
      "Our app supports various tournament formats including single elimination, double elimination, round-robin, and Swiss system. You can select the format that best suits your needs when creating a new tournament.",
    ],
  },
  {
    question: "How can I track scores and update brackets?",
    answer: [
      "As the tournament progresses, you can update scores on the tournament page. Click on a match and enter the scores. The app will automatically update the brackets based on the results you input.",
    ],
  },
  {
    question: "Is there a limit to the number of participants?",
    answer: [
      "The maximum number of participants depends on your account type. Free accounts can create tournaments with up to 32 participants, while premium accounts can host tournaments with up to 256 participants.",
    ],
  },
  {
    question: "Can I generate a tournament report?",
    answer: [
      "Yes, you can generate a comprehensive tournament report once the event is completed. Go to the tournament page and click on 'Generate Report'. This will create a PDF with all match results, final standings, and statistics.",
    ],
  },
  {
    question: "How do I resolve disputes or correct mistakes in scores?",
    answer: [
      "If there's a dispute or a mistake in the scores, you can edit the match results as the tournament organizer. Go to the specific match, click on 'Edit Scores', and make the necessary corrections. The brackets will automatically update to reflect the changes.",
      "If there's a dispute or a mistake in the scores, you can edit the match results as the tournament organizer. Go to the specific match, click on 'Edit Scores', and make the necessary corrections. The brackets will automatically update to reflect the changes.",
    ],
  },
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="cardFull dark:bg-slate-900">
        <CardHeader>
          <div className="flex items-center justify-center space-x-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl font-bold">
              Frequently Asked Questions
            </CardTitle>
          </div>
          <CardDescription className="text-center">
            Find answers to common questions about creating and managing
            tournaments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                className="pl-8 dark:bg-slate-950"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border border-muted rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 transition-colors">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="p-4 dark:bg-slate-800 bg-slate-100">
                  {faq.answer.map((answer, index) => (
                    <li key={index} className="text-left py-2">
                      {answer}
                    </li>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-lg">
                No matching questions found. Please try a different search term.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
