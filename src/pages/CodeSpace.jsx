import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '@/stores/useUserStore';
import { api } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import CodeSpacesList from '@/components/codespace/CodeSpaceList';
import CreateCodeSpaceForm from '@/components/codespace/codeSpaceForm';
import { IoIosClose } from "react-icons/io";

const CodeSpace = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [codeSpaces, setCodeSpaces] = useState([])
  const [allCodeSpaces, setAllCodeSpaces] = useState([])

  const { user } = useUserStore();

  const { data, isPending } = useQuery({
    queryKey: ["codeSpaces"],
    queryFn: async () => {
      const response = await api.get('/codespace/get')
      return response?.data.data;
    }
  })

  useEffect(() => {
    if (data) {
      setAllCodeSpaces(data)
      setCodeSpaces(data)
    }
  }, [data])

  useEffect(() => {
    const filtered = allCodeSpaces.filter((codeSpace) =>
      codeSpace.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setCodeSpaces(filtered)
  }, [searchTerm, allCodeSpaces])

  return (
    <section className='px-3'>
      <div className='bg-richblack-800 flex flex-col w-full rounded-lg'>
        <div className='flex flex-col justify-center h-full w-full '>
          <div className='flex flex-col md:flex-row gap-y-4 items-center justify-between gap-x-3'>
            <h3 className='text-xl lg:text-2xl font-medium text-center'>
              Welcome to <span className='text-main-400'>Codespace</span>
            </h3>
            <div className='flex gap-x-4 items-center'>
              <div className='flex items-center gap-x-2'>
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  className='bg-white border border-dark-600 rounded-md h-9 px-4 min-w-[320px] text-sm'
                  placeholder='Search for code spaces'
                />

                {
                  searchTerm && (
                    <button onClick={() => setSearchTerm("")} className='text-dark-800'>
                      <IoIosClose />
                    </button>
                  )
                }

              </div>
              {
                user?.accountType === "Instructor" && (
                  <Button onClick={() => setFormOpen(prev => !prev)}>
                    Create code space
                  </Button>
                )
              }
            </div>
          </div>

          <CodeSpacesList user={user} loading={isPending} data={codeSpaces} />

          {formOpen && (
            <CreateCodeSpaceForm setFormOpen={setFormOpen} />
          )}
        </div>
      </div>
    </section>
  )
}

export default CodeSpace
