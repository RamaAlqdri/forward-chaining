"use client";
import { Gejala } from "@/lib/models/ModelGejala";
import { serviceGejala } from "@/lib/services/ServiceGejala";
import { Select, SelectItem } from "@tremor/react";
import { randomUUID } from "crypto";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Home() {
  const [dataGejala, setDataGejala] = useState<Gejala[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await serviceGejala.getGejalaList();
      setDataGejala(response);
    };
    fetchData();
  }, []);

  const [showSuntingPopUp, setShowSuntingPopUp] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showPopUpTambahData, setShowPopUpTambahData] =
    useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);

  const [selectedGejala, setSelectedGejala] = useState<Gejala>({
    id: "",
    name: "",
  });
  // Fungsi untuk navigasi ke halaman sebelumnya

  const handleSuntingGejala = (gejala: Gejala) => {
    setSelectedGejala(gejala);
    setShowSuntingPopUp(true);
  };
  const handleDeletedGejala = (gejala: Gejala) => {
    setSelectedGejala(gejala);
    setShowDeletePopUp(true);
  };

  const handlePrevious = () => {
    if (startIndex !== 0) {
      setStartIndex(startIndex - itemsPerPage);
      setEndIndex(endIndex - itemsPerPage);
    }
  };

  // Fungsi untuk navigasi ke halaman berikutnya
  const handleNext = () => {
    if (endIndex < dataGejala.length) {
      setStartIndex(startIndex + itemsPerPage);
      setEndIndex(endIndex + itemsPerPage);
    }
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full flex flex-col items-center mt-8">
        <p className="text-2xl text-white/80 font-semibold text-start mb-2">
          Data Gejala
        </p>
        <div className="flex flex-col w-[80%] py-4 px-6 bg-[#272B2F]   rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full mt-2 table-fixed">
              {/* head */}
              <thead className="w-full">
                <tr className="w-full h-10  ">
                  <th className=" text-white/80 text-base text-center">
                    Gejala
                  </th>
                  <th className="w-[7rem] text-white/80 text-base text-center border-l-[0.2px] border-white/20">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {dataGejala.slice(startIndex, endIndex).map((gejala, index) => (
                  <tr
                    key={gejala.id}
                    className=" border-y-[0.2px] border-white/20"
                  >
                    <td className="text-base text-wrap  text-white/70 px-2 border-r-[0.2px] py-2 border-white/20">
                      {gejala.name}
                    </td>
                    <td className="flex justify-center h-14 items-center   space-x-2 px-2">
                      <button
                        onClick={() => handleSuntingGejala(gejala)}
                        className="px-2 py-2 bg-[#F1B32B]/10 rounded-lg"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.4549 5.41607C21.5499 5.56028 21.5922 5.73286 21.5747 5.90466C21.5573 6.07647 21.481 6.23697 21.3589 6.35907L12.1659 15.5511C12.0718 15.6451 11.9545 15.7124 11.8259 15.7461L7.99689 16.7461C7.87032 16.7791 7.73732 16.7784 7.61109 16.7441C7.48485 16.7099 7.36978 16.6432 7.27729 16.5507C7.18479 16.4582 7.1181 16.3431 7.08382 16.2169C7.04955 16.0906 7.04888 15.9576 7.08189 15.8311L8.08189 12.0031C8.11109 11.8882 8.16616 11.7814 8.24289 11.6911L17.4699 2.47007C17.6105 2.32962 17.8011 2.25073 17.9999 2.25073C18.1986 2.25073 18.3893 2.32962 18.5299 2.47007L21.3589 5.29807C21.3948 5.33408 21.4269 5.37361 21.4549 5.41607ZM19.7679 5.82807L17.9999 4.06107L9.48189 12.5791L8.85689 14.9721L11.2499 14.3471L19.7679 5.82807Z"
                            fill="#F1B32B"
                          />
                          <path
                            d="M19.6411 17.1599C19.9144 14.8238 20.0017 12.4698 19.9021 10.1199C19.8999 10.0645 19.9092 10.0093 19.9293 9.95769C19.9494 9.90608 19.98 9.85916 20.0191 9.81989L21.0031 8.83589C21.0299 8.80885 21.0641 8.79014 21.1013 8.78203C21.1386 8.77392 21.1774 8.77674 21.2131 8.79015C21.2488 8.80356 21.2799 8.827 21.3026 8.85764C21.3253 8.88828 21.3386 8.92483 21.3411 8.96289C21.5263 11.7541 21.456 14.5564 21.1311 17.3349C20.8951 19.3569 19.2711 20.9419 17.2581 21.1669C13.7634 21.5539 10.2367 21.5539 6.74206 21.1669C4.73006 20.9419 3.10506 19.3569 2.86906 17.3349C2.45446 13.7903 2.45446 10.2095 2.86906 6.66489C3.10506 4.64289 4.72906 3.05789 6.74206 2.83289C9.39443 2.53877 12.0668 2.46752 14.7311 2.61989C14.7692 2.62262 14.8057 2.63623 14.8364 2.6591C14.867 2.68196 14.8904 2.71313 14.9039 2.74891C14.9174 2.78468 14.9203 2.82357 14.9124 2.86096C14.9044 2.89835 14.8859 2.93268 14.8591 2.95989L13.8661 3.95189C13.8272 3.99064 13.7807 4.02101 13.7297 4.04113C13.6786 4.06125 13.6239 4.0707 13.5691 4.06889C11.3458 3.99331 9.12001 4.07853 6.90906 4.32389C6.263 4.39539 5.65991 4.68261 5.19721 5.13914C4.73451 5.59567 4.43923 6.19485 4.35906 6.83989C3.9581 10.2682 3.9581 13.7316 4.35906 17.1599C4.43923 17.8049 4.73451 18.4041 5.19721 18.8606C5.65991 19.3172 6.263 19.6044 6.90906 19.6759C10.2641 20.0509 13.7361 20.0509 17.0921 19.6759C17.7381 19.6044 18.3412 19.3172 18.8039 18.8606C19.2666 18.4041 19.5609 17.8049 19.6411 17.1599Z"
                            fill="#F1B32B"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeletedGejala(gejala)}
                        className="px-2 py-2 bg-[#FD413C]/10 rounded-lg"
                      >
                        <svg
                          width="24"
                          height="21"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 2H6C6 1.73478 5.89464 1.48043 5.70711 1.29289C5.51957 1.10536 5.26522 1 5 1C4.73478 1 4.48043 1.10536 4.29289 1.29289C4.10536 1.48043 4 1.73478 4 2ZM3 2C3 1.46957 3.21071 0.960859 3.58579 0.585786C3.96086 0.210714 4.46957 0 5 0C5.53043 0 6.03914 0.210714 6.41421 0.585786C6.78929 0.960859 7 1.46957 7 2H9.5C9.63261 2 9.75979 2.05268 9.85355 2.14645C9.94732 2.24021 10 2.36739 10 2.5C10 2.63261 9.94732 2.75979 9.85355 2.85355C9.75979 2.94732 9.63261 3 9.5 3H9.059L8.616 8.17C8.57341 8.66923 8.34499 9.13429 7.97593 9.47317C7.60686 9.81205 7.12405 10.0001 6.623 10H3.377C2.87595 10.0001 2.39314 9.81205 2.02407 9.47317C1.65501 9.13429 1.42659 8.66923 1.384 8.17L0.941 3H0.5C0.367392 3 0.240215 2.94732 0.146447 2.85355C0.0526784 2.75979 0 2.63261 0 2.5C0 2.36739 0.0526784 2.24021 0.146447 2.14645C0.240215 2.05268 0.367392 2 0.5 2H3ZM6.5 5C6.5 4.86739 6.44732 4.74021 6.35355 4.64645C6.25979 4.55268 6.13261 4.5 6 4.5C5.86739 4.5 5.74021 4.55268 5.64645 4.64645C5.55268 4.74021 5.5 4.86739 5.5 5V7C5.5 7.13261 5.55268 7.25979 5.64645 7.35355C5.74021 7.44732 5.86739 7.5 6 7.5C6.13261 7.5 6.25979 7.44732 6.35355 7.35355C6.44732 7.25979 6.5 7.13261 6.5 7V5ZM4 4.5C4.13261 4.5 4.25979 4.55268 4.35355 4.64645C4.44732 4.74021 4.5 4.86739 4.5 5V7C4.5 7.13261 4.44732 7.25979 4.35355 7.35355C4.25979 7.44732 4.13261 7.5 4 7.5C3.86739 7.5 3.74021 7.44732 3.64645 7.35355C3.55268 7.25979 3.5 7.13261 3.5 7V5C3.5 4.86739 3.55268 4.74021 3.64645 4.64645C3.74021 4.55268 3.86739 4.5 4 4.5ZM2.38 8.085C2.4013 8.3347 2.51558 8.5673 2.70022 8.73676C2.88486 8.90621 3.12639 9.00016 3.377 9H6.623C6.87344 8.9999 7.11472 8.90584 7.29915 8.73642C7.48357 8.56699 7.59771 8.33453 7.619 8.085L8.055 3H1.945L2.38 8.085Z"
                            fill="#FD413C"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center mt-4 justify-between">
            <div className="space-x-2">
              <button
                onClick={handlePrevious}
                className="btn bg-[#212529] border-none text-white/70 rounded-xl  text-xm px-3 w-fit"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="btn bg-[#212529] border-none text-white/70 rounded-xl  text-xm px-3 w-fit"
              >
                Next
              </button>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPopUpTambahData(true)}
                className="btn bg-[#1FC2AD]/10 border-none text-[#1FC2AD] rounded-xl  text-base px-4 w-fit"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute ">
        <PopUpEdit
          visible={showSuntingPopUp}
          setVisible={setShowSuntingPopUp}
          gejala={selectedGejala}
        />
        <PopUpDelete
          visible={showDeletePopUp}
          setVisible={setShowDeletePopUp}
          gejala={selectedGejala}
        />
        <PopUpTambahData
          visible={showPopUpTambahData}
          setVisible={setShowPopUpTambahData}
        />
      </div>
    </div>
  );
}

interface PopUpEditProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  gejala: Gejala;
}
interface PopUpTambahProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const PopUpTambahData = ({ visible, setVisible }: PopUpTambahProps) => {
  type Inputs = {
    name: string;
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
    },
  });

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name } = form;

    try {
      const id = `GJL-${nanoid(4)}-${nanoid(8)}`;
      const data = {
        id,
        name,
      };
      console.log(data);
      await serviceGejala.createGejala(data);
    } catch (error) {
      console.error("Error creating gejala:", error);
    } finally {
      setVisible(false);
      window.location.reload();
    }
  };
  if (visible) {
    return (
      <div className="bg-black/20 w-screen h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className=" w-[80%] space-y-4  py-4 px-6 -mt-20 bg-[#272B2F]   rounded-3xl"
        >
          <div>
            <p className="text-white/80 font-semibold text-lg">
              Sunting Data Gejala
            </p>
          </div>
          <div className="w-full ">
            <p className="text-sm text-white/50 ml-[0.1rem]">Nama Gejala</p>
            <textarea
              id="name"
              {...register("name", { required: true })}
              className="mt-1 focus:outline-none bg-black/20 py-2 px-4 rounded-lg text-white/60 w-full"
            />
          </div>
          <div className="space-x-2 ">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 bg-[#1FC2AD]/10 border-none hover:bg-black/40 text-[#1FC2AD] rounded-xl font-medium  text-sm px-4"
            >
              Tambah
            </button>
            <button
              onClick={() => setVisible(false)}
              className="py-2 bg-[#FD413C]/10 border-none hover:bg-black/40 text-[#FD413C] rounded-xl font-medium  text-sm px-4"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    );
  }
};
const PopUpEdit = ({ visible, setVisible, gejala }: PopUpEditProps) => {
  type Inputs = {
    name: string;
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: gejala.name,
    },
  });

  useEffect(() => {
    setValue("name", gejala.name);
    // console.log("hey");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gejala]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name } = form;

    try {
      setVisible(false);
      const data = {
        id: gejala.id,
        name,
      };
      console.log(data);
      await serviceGejala.updateGejala(data);
    } catch (error) {
      console.error("Error creating gejala:", error);
    } finally {
      window.location.reload();
    }
  };

  if (visible) {
    return (
      <div className="bg-black/20 w-screen h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className=" w-[80%] space-y-4  py-4 px-6 -mt-20 bg-[#272B2F]   rounded-3xl"
        >
          <div>
            <p className="text-white/80 font-semibold text-lg">
              Sunting Data Gejala
            </p>
          </div>
          <div className="w-full ">
            <p className="text-sm text-white/50 ml-[0.1rem]">Nama Gejala</p>
            <textarea
              id="name"
              {...register("name", { required: true })}
              className="mt-1 focus:outline-none bg-black/20 py-2 px-4 rounded-lg text-white/60 w-full"
            />
          </div>
          <div className="space-x-2 ">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2 bg-[#1FC2AD]/10 border-none hover:bg-black/40 text-[#1FC2AD] rounded-xl font-medium  text-sm px-4"
            >
              Sunting
            </button>
            <button
              onClick={() => {
                reset();
                setVisible(false);
              }}
              className="py-2 bg-[#FD413C]/10 border-none hover:bg-black/40 text-[#FD413C] rounded-xl font-medium  text-sm px-4"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    );
  }
};
const PopUpDelete = ({ visible, setVisible, gejala }: PopUpEditProps) => {
  console.log(gejala);
  const [namaGejala, setNamaGejala] = useState("");
  useEffect(() => {
    setNamaGejala(gejala.name);
  }, [gejala.name]);
  //   console.log(namaGejala);

  const handleDelete = async () => {
    try {
      await serviceGejala.deleteGejala(gejala.id);
    } catch (error) {
      console.error("Error creating gejala:", error);
    } finally {
      setVisible(false);
      window.location.reload();
    }
  };
  if (visible) {
    return (
      <div className="bg-black/20 w-screen h-screen flex items-center justify-center">
        <div className=" w-[80%] space-y-4  py-4 px-6 -mt-20 bg-[#272B2F]   rounded-3xl">
          <div>
            <p className="text-white/80 font-semibold text-lg">
              Hapus Data Gejala
            </p>
          </div>
          <p className="text-white/70 text-center">
            {`Apakah anda yakin ingin menghapus gejala "${gejala.name}"`}
          </p>
          <div className="space-x-2 ">
            <button
              onClick={handleDelete}
              className="py-2 bg-[#FD413C]/10 border-none hover:bg-black/40 text-[#FD413C] rounded-xl font-medium  text-sm px-4"
            >
              Hapus
            </button>
            <button
              onClick={() => setVisible(false)}
              className="py-2 bg-[#1FC2AD]/10 border-none hover:bg-black/40 text-[#1FC2AD] rounded-xl font-medium  text-sm px-4"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    );
  }
};
