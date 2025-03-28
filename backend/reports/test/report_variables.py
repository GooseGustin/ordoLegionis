NIL = 'NIL'
NON = '-'
NULL = ""

###########################################
curia = {
    "id": 2,
    "name": "Our Lady Virgin Most Prudent",
    "iden": "V347POM20L",
    "inaug_date": "2000-01-02",
    "email": "virginmostprudent2018@gmail.com",
    "state": "Plateau",
    "country": "Nigeria",
    "archdiocese": "Jos",
    "parish": "St. Finbarr's Catholic Church, Rayfield, Jos",
    "creator": 1,
    "created_at": "2025-03-19T08:28:49.788348Z",
    "managers": [
        1
    ],
    "management_requests": []
}
# -------------------------------------
praesidium = {
    "id": 2,
    "name": "Our Lady Mother of Good Counsel",
    "state": "Plateau",
    "country": "Nigeria",
    "parish": "St. Peter's Catholic Church, Topp",
    "curia": 2,
    "iden": "CoLMG27301O",
    "address": "Inside the church",
    "meeting_time": "Every Sunday at 7:30 AM",
    "inaug_date": "2022-02-05",
    "spiritual_director": "Fr. Peter Zakka Daluk",
    "spiritual_director_app_date": "2025-02-07",
    "president": "Bro. Mafeng Pam",
    "pres_app_date": "2024-03-10",
    "vice_president": "Sis. Josephine Dung",
    "vp_app_date": "2023-09-10",
    "secretary": "Sis. Kangyang Pam",
    "sec_app_date": "2022-02-05",
    "treasurer": "Sis. Peace Yakubu",
    "tres_app_date": "2022-02-05",
    "managers": [
        1
    ],
    "members": [
        1
    ],
    "membership_requests": [],
    "next_report_deadline": "2025-04-13",
    "created_at": "2025-03-19T08:39:36.041958Z",
    "reports": [
        17
    ]
}
# -----------------------------------------------
report = {
    "id": 19,
    "praesidium": 2,
    "submission_date": "2025-04-13",
    "last_submission_date": "2024-04-14",
    "report_number": 1,
    "report_period": 52,
    "last_curia_visit_date": None,
    "last_curia_visitors": "Sis. Victoria Pam from Ark of the Covenant, Mazaram",
    "officers_curia_attendance": {
        "President": 0,
        "Vice President": 0,
        "Secretary": 0,
        "Treasurer": 0
    },
    "no_curia_meetings_held": {
        "President": 13,
        "Vice President": 13,
        "Secretary": 13,
        "Treasurer": 13
    },
    "no_praesidium_meetings_held": {
        "President": 49,
        "Vice President": 49,
        "Secretary": 49,
        "Treasurer": 49
    },
    "no_curia_meetings_held_previous": {
        "President": 0,
        "Vice President": 0,
        "Secretary": 5,
        "Treasurer": 0
    },
    "no_praesidium_meetings_held_previous": {
        "President": 0,
        "Vice President": 0,
        "Secretary": 10,
        "Treasurer": 0
    },
    "officers_meeting_attendance": {
        "President": 45,
        "Vice President": 49,
        "Secretary": 28,
        "Treasurer": 39
    },
    "extension_plans": "Recruit more members",
    "problems": "",
    "remarks": "",
    "no_meetings_expected": 52,
    "no_meetings_held": 49,
    "avg_attendance": 6,
    "poor_attendance_reason": "Most members are students, usually away for school",
    "membership_details": 22,
    "include_intermediate": True,
    "achievements": {
        "id": 41,
        "no_recruited": [
            1,
            0
        ],
        "no_baptized": [
            0,
            0
        ],
        "no_confirmed": [
            0,
            0
        ],
        "no_first_communicants": [
            0,
            0
        ],
        "no_married": [
            0,
            0
        ],
        "no_vocations": [
            0,
            0
        ],
        "no_converted": [
            0,
            0
        ],
        "others": {
            "Took Legion promise": [4, 3]
        }
    },
    "function_attendances": [
        243,
        244,
        245,
        246,
        247,
        248,
        249,
        250,
        251,
        252,
        253,
        254,
        255,
        256
    ],
    "work_total_and_average": {
        "Home Visitation": {
            "total": True,
            "average": True
        },
        "Crowd Contact": {
            "total": True,
            "average": True
        }
    },
    "patricians_start": "2024-04",
    "patricians_end": "2025-04",
    "work_summaries": [
        131,
        132,
        133,
        134,
        135,
        136
    ],
    "financial_summary": {
        "id": 19,
        "report": 19,
        "month_year": [
            [
                "Apr",
                2024
            ],
            [
                "May",
                2024
            ],
            [
                "Jun",
                2024
            ],
            [
                "Jul",
                2024
            ],
            [
                "Aug",
                2024
            ],
            [
                "Sep",
                2024
            ],
            [
                "Oct",
                2024
            ],
            [
                "Nov",
                2024
            ],
            [
                "Dec",
                2024
            ],
            [
                "Jan",
                2025
            ],
            [
                "Feb",
                2025
            ],
            [
                "Mar",
                2025
            ]
        ],
        "acf": [
            0,
            90,
            330,
            520,
            650,
            1050,
            680,
            2030,
            520,
            1610,
            2590,
            220
        ],
        "sbc": [
            610,
            920,
            1300,
            970,
            800,
            1480,
            1180,
            730,
            1520,
            880,
            1030,
            670
        ],
        "balance": [
            90,
            330,
            520,
            650,
            1550,
            680,
            2030,
            520,
            1610,
            2590,
            220,
            790
        ],
        "expenses": {
            "bouquet": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "stationery": [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "altar": [
                0,
                0,
                0,
                0,
                0,
                100,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "extension": [
                400,
                200,
                450,
                400,
                500,
                550,
                0,
                0,
                0,
                400,
                0,
                0
            ],
            "remittance": [
                0,
                0,
                500,
                500,
                0,
                0,
                0,
                1200,
                0,
                0,
                3300,
                200
            ],
            "others": [
                [
                    {
                        "Previous report": 250
                    }
                ],
                [
                    {
                        "Booking of Edel Quinn Mass": 500
                    }
                ],
                [],
                [],
                [],
                [
                    {
                        "Booking of Mary's birthday Mass": 500
                    },
                    {
                        "Mary's birthday transportation of juniors": 700
                    }
                ],
                [],
                [
                    {
                        "Booking of departed legionaries Mass": 500
                    },
                    {
                        "Booking of Frank Duff's Mass": 500
                    }
                ],
                [],
                [],
                [],
                []
            ]
        },
        "report_production": 0,
        "balance_at_hand": 0
    },
    "audited": False,
    "previous_curia_attendance": {
        "President": 0,
        "Vice President": 0,
        "Secretary": 0,
        "Treasurer": 0
    },
    "previous_meeting_attendance": {
        "President": 0,
        "Vice President": 0,
        "Secretary": 0,
        "Treasurer": 0
    },
    "read_and_accepted": True,
    "conclusion": "This report was carefully extracted from the records of the praesidium, which include the worksheet, roll call book, minutes book, and treasurer's book.",
    "membership": {
        "id": 22,
        "affiliated_praesidia": [
            1,
            0,
            1
        ],
        "active_members": [
            7,
            0,
            0
        ],
        "probationary_members": [
            1,
            0,
            0
        ],
        "auxiliary_members": [
            0,
            0,
            0
        ],
        "adjutorian_members": [
            0,
            0,
            0
        ],
        "praetorian_members": [
            0,
            0,
            0
        ]
    },
    "fxn_attendances": [
        {
            "id": 243,
            "name": "Acies",
            "date": "2025-03-30",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 244,
            "name": "May Devotion",
            "date": "2024-05-01",
            "current_year_attendance": 3,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 245,
            "name": "Edel Quinn Mass",
            "date": "2024-05-12",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 246,
            "name": "Annual Enclosed Retreat",
            "date": None,
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 247,
            "name": "Mary's Birthday",
            "date": "2024-09-08",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 248,
            "name": "Officers' Workshop",
            "date": None,
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 249,
            "name": "October Devotion",
            "date": "2024-10-01",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 250,
            "name": "Departed Legionaries' Mass",
            "date": "2024-11-02",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 251,
            "name": "Frank Duff's Mass",
            "date": "2024-11-12",
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 252,
            "name": "Legion Congress",
            "date": None,
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 253,
            "name": "Patrician Meetings",
            "date": None,
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 254,
            "name": "Annual General Reunion",
            "date": "2024-12-15",
            "current_year_attendance": 7,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 255,
            "name": "Exporatio Dominicalis",
            "date": None,
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        },
        {
            "id": 256,
            "name": "Outdoor Function",
            "date": None,
            "current_year_attendance": 0,
            "previous_year_attendance": 0,
            "report": 19
        }
    ],
    "work_summary": [
        {
            "type": "Home Visitation",
            "active": True,
            "no_done": 32,
            "no_assigned": 46,
            "details": {
                "No. of active Catholics": 121,
                "No. of inactive Catholics": 145,
                "No. of separated brethren": 157,
                "No. of homes": 131,
                "No. of unknowns": 2
            }
        },
        {
            "type": "Crowd Contact",
            "active": True,
            "no_done": 16,
            "no_assigned": 32,
            "details": {
                "No. of inactive Catholics": 9,
                "No. of separated brethren": 18,
                "No. of muslims": 2,
                "No. of active Catholics": 31
            }
        },
        {
            "type": "Catechism Instruction",
            "active": True,
            "no_done": 30,
            "no_assigned": 38,
            "details": {
                "No. of catechumen": 416
            }
        },
        {
            "type": "Care for Children at Mass",
            "active": True,
            "no_done": 47,
            "no_assigned": 47,
            "details": {
                "No. of children": 2946
            }
        },
        {
            "type": "Care for the Junior Praesidium",
            "active": True,
            "no_done": 49,
            "no_assigned": 49,
            "details": {
                "No. of children": 843
            }
        },
        {
            "type": "Praying the rosary",
            "active": False,
            "no_done": 2,
            "no_assigned": 11,
            "details": {}
        }
    ]
}

