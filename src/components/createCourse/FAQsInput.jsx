import { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import InputField from '../common/InputField'
import TextAreaField from '../common/TextAreaField '
import { Button } from '../ui/button'
import { IoClose } from 'react-icons/io5'
import { FaQuestion } from 'react-icons/fa6'
import { MdOutlineQuestionAnswer } from 'react-icons/md'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const FAQsInput = ({ setValue, getValues, errors, clearErrors, faqs: FrquentlyAskedQuestions }) => {
  const [faqs, setFaqs] = useState(FrquentlyAskedQuestions || [])
  const [currentFAQ, setCurrentFAQ] = useState({ question: '', answer: '' })
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    setFaqs(FrquentlyAskedQuestions || [])
  }, [FrquentlyAskedQuestions])

  const handleAddFAQ = () => {
    if (currentFAQ.question.trim() && currentFAQ.answer.trim()) {
      const updatedFaqs = [...faqs, currentFAQ]
      setFaqs(updatedFaqs)
      setValue('faqs', updatedFaqs)
      clearErrors('faqs')
      setCurrentFAQ({ question: '', answer: '' })
    }
  }

  const handleRemoveFAQ = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index)
    setFaqs(updatedFaqs)
    setValue('faqs', updatedFaqs)
    if (openIndex === index) setOpenIndex(null)
  }

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-1">
      <Label className="font-medium">FAQs</Label>

      {/* FAQ ACCORDION PREVIEW */}
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-md bg-white border border-dark-600 mb-2"
          >
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-start text-sm gap-2">
                <FaQuestion className='mt-1' />
                <span className="font-normal">{faq.question}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFAQ(index)
                  }}
                  className="text-red-500"
                >
                  <IoClose size={18} />
                </button>
                {openIndex === index ? (
                  <IoIosArrowUp size={18} />
                ) : (
                  <IoIosArrowDown size={18} />
                )}
              </div>
            </div>
            {openIndex === index && (
              <div className="px-3 py-2 bg-dark-100 border-t text-sm text-muted-foreground flex gap-2 items-start">
                <MdOutlineQuestionAnswer className="mt-1" />
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ADD NEW FAQ FORM */}
      <div className="space-y-2">
        <InputField
          type="text"
          name="question"
          id="question"
          icon={<FaQuestion />}
          placeholder="Enter FAQ question"
          value={currentFAQ.question}
          onChange={(e) =>
            setCurrentFAQ({ ...currentFAQ, question: e.target.value })
          }
        />
        <TextAreaField
          name="answer"
          id="answer"
          icon={<MdOutlineQuestionAnswer />}
          placeholder="Enter FAQ answer"
          rows={3}
          value={currentFAQ.answer}
          onChange={(e) =>
            setCurrentFAQ({ ...currentFAQ, answer: e.target.value })
          }
        />
        <Button type="button" onClick={handleAddFAQ}>
          Add FAQ
        </Button>
      </div>
      {
        errors.faqs && (
          <span className="text-red-500 text-sm">{errors.faqs.message}</span>
        )
      }
    </div>
  )
}

export default FAQsInput
